"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { AboutPhoto } from "@/data/about-photos";
import { fetchLikeCounts, likesConfigured, toggleLike } from "@/lib/likes";
import { HeartIcon } from "@/components/icons";

// Double-tap detection thresholds
const TAP_MAX_MOVE_PX = 10;
const TAP_MAX_HOLD_MS = 400;
const DOUBLE_TAP_MAX_GAP_MS = 300;
const DOUBLE_TAP_MAX_DISTANCE_PX = 30;

const storageKey = (id: string) => `liked:${id}`;

// localStorage throws in private mode on some browsers, so every access is guarded.
function readLiked(id: string): boolean {
  try {
    return localStorage.getItem(storageKey(id)) === "1";
  } catch {
    return false;
  }
}

function writeLiked(id: string, liked: boolean) {
  try {
    if (liked) localStorage.setItem(storageKey(id), "1");
    else localStorage.removeItem(storageKey(id));
  } catch {
    // Not persisted; the like still holds for this visit.
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AboutGallery({ photos }: { photos: AboutPhoto[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  /** Ids with a request in flight — further clicks on them are ignored until it settles. */
  const pending = useRef(new Set<string>());
  /** Ids the visitor has toggled this visit; the initial fetch must not overwrite their newer counts. */
  const touched = useRef(new Set<string>());

  useEffect(() => {
    setLiked(Object.fromEntries(photos.map((photo) => [photo.id, readLiked(photo.id)])));

    if (!likesConfigured) {
      console.warn("Likes: Supabase env vars are not set, so likes are saved on this device only.");
      return;
    }

    let cancelled = false;
    fetchLikeCounts(photos.map((photo) => photo.id))
      .then((fetched) => {
        if (cancelled) return;
        setCounts((current) => {
          const next = { ...current };
          for (const [id, count] of Object.entries(fetched)) {
            if (!touched.current.has(id)) next[id] = count;
          }
          return next;
        });
      })
      .catch(() => {
        // Counts stay hidden; liking still works.
      });
    return () => {
      cancelled = true;
    };
  }, [photos]);

  const setLike = async (id: string, liking: boolean) => {
    if (pending.current.has(id) || Boolean(liked[id]) === liking) return;

    const previousCount = counts[id] ?? 0;

    // Optimistic update
    setLiked((current) => ({ ...current, [id]: liking }));
    setCounts((current) => ({ ...current, [id]: Math.max(previousCount + (liking ? 1 : -1), 0) }));
    writeLiked(id, liking);

    if (!likesConfigured) return;

    pending.current.add(id);
    touched.current.add(id);
    try {
      const count = await toggleLike(id, liking);
      setCounts((current) => ({ ...current, [id]: count }));
    } catch {
      // Roll back
      setLiked((current) => ({ ...current, [id]: !liking }));
      setCounts((current) => ({ ...current, [id]: previousCount }));
      writeLiked(id, !liking);
    } finally {
      pending.current.delete(id);
    }
  };

  return (
    <div className="about-gallery">
      {photos.map((photo) => (
        <GalleryPhoto
          key={photo.id}
          photo={photo}
          liked={Boolean(liked[photo.id])}
          count={counts[photo.id] ?? 0}
          onSetLike={(liking) => setLike(photo.id, liking)}
        />
      ))}
    </div>
  );
}

function GalleryPhoto({
  photo,
  liked,
  count,
  onSetLike,
}: {
  photo: AboutPhoto;
  liked: boolean;
  count: number;
  onSetLike: (liking: boolean) => void;
}) {
  /** Plays the small heart's pop; set only on a fresh like, never on page load. */
  const [pop, setPop] = useState(false);
  /** Non-null while the big heart burst is on screen; a new value restarts the animation. */
  const [burst, setBurst] = useState<number | null>(null);
  const burstId = useRef(0);

  const like = () => {
    if (!liked) setPop(true);
    onSetLike(true);
  };

  const handleButtonClick = () => {
    if (liked) {
      setPop(false);
      onSetLike(false);
    } else {
      like();
    }
  };

  // Double-tap never unlikes: it shows the burst and likes if not already liked.
  const handleDoubleTap = () => {
    if (!prefersReducedMotion()) setBurst(++burstId.current);
    like();
  };

  // Double-tap is detected by hand rather than with onDoubleClick, which doesn't fire reliably on touch.
  // Nothing here calls preventDefault, so scrolling and pinch-zoom are left entirely to the browser:
  // when it takes over a gesture it sends pointercancel, which resets the tap.
  const tap = useRef({ pointers: 0, multiTouch: false, startX: 0, startY: 0, startTime: 0, lastX: 0, lastY: 0, lastTime: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const t = tap.current;
    t.pointers += 1;
    if (t.pointers > 1) {
      // Second finger down: this is a pinch, not a tap.
      t.multiTouch = true;
      t.lastTime = 0;
      return;
    }
    t.startX = e.clientX;
    t.startY = e.clientY;
    t.startTime = e.timeStamp;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const t = tap.current;
    t.pointers = Math.max(t.pointers - 1, 0);
    if (t.multiTouch) {
      if (t.pointers === 0) t.multiTouch = false;
      return;
    }

    const moved = Math.hypot(e.clientX - t.startX, e.clientY - t.startY) > TAP_MAX_MOVE_PX;
    const held = e.timeStamp - t.startTime > TAP_MAX_HOLD_MS;
    if (moved || held) {
      t.lastTime = 0;
      return;
    }

    const isSecondTap =
      t.lastTime > 0 &&
      e.timeStamp - t.lastTime < DOUBLE_TAP_MAX_GAP_MS &&
      Math.hypot(e.clientX - t.lastX, e.clientY - t.lastY) < DOUBLE_TAP_MAX_DISTANCE_PX;

    if (isSecondTap) {
      t.lastTime = 0;
      handleDoubleTap();
    } else {
      t.lastX = e.clientX;
      t.lastY = e.clientY;
      t.lastTime = e.timeStamp;
    }
  };

  const resetTap = () => {
    const t = tap.current;
    t.pointers = 0;
    t.multiTouch = false;
    t.lastTime = 0;
  };

  return (
    <figure className="about-gallery-post">
      <div
        className="about-gallery-item"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetTap}
        // Mouse only: a touch pointer "leaves" as soon as the finger lifts, which would wipe the first tap.
        onPointerLeave={(e) => e.pointerType === "mouse" && resetTap()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          draggable={false}
          sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
          style={{
            objectFit: "cover",
            objectPosition: photo.position ?? "center",
            transform: photo.scale ? `scale(${photo.scale})` : undefined,
          }}
        />
        {burst !== null && (
          <span key={burst} className="like-burst" aria-hidden="true" onAnimationEnd={() => setBurst(null)}>
            <HeartIcon filled />
          </span>
        )}
      </div>

      <div className="like-row">
        <button
          type="button"
          className={pop ? "like-button like-pop" : "like-button"}
          aria-pressed={liked}
          aria-label={liked ? "Unlike this photo" : "Like this photo"}
          onClick={handleButtonClick}
          onAnimationEnd={() => setPop(false)}
        >
          <HeartIcon filled={liked} />
        </button>
        {/* Shown as soon as there is at least one like; a photo with none shows just the heart. */}
        {count > 0 && (
          <span className="like-count" aria-label={count === 1 ? "1 like" : `${count} likes`}>
            {count.toLocaleString("en-US")}
          </span>
        )}
      </div>
    </figure>
  );
}
