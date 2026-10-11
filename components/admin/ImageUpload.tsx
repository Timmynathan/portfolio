"use client";

import { useRef, useState } from "react";
import { MEDIA_BUCKET } from "@/lib/supabase";
import { supabase } from "@/components/admin/supabase-client";

const MAX_BYTES = 5 * 1024 * 1024;

export interface ImageSize {
  width: number;
  height: number;
}

/** Natural pixel size of an image URL (or object URL). */
export function measureImage(src: string): Promise<ImageSize> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Couldn't read that image"));
    img.src = src;
  });
}

/**
 * Shows the current image and uploads a replacement to Supabase storage.
 * `onChange` gets the new public URL and the image's pixel size ("" when removed).
 */
export function ImageUpload({
  label,
  value,
  onChange,
  folder,
  hint,
  allowRemove = true,
}: {
  label: string;
  value: string;
  onChange: (url: string, size: ImageSize | null) => void;
  /** Storage folder, e.g. "projects". */
  folder: string;
  hint?: string;
  allowRemove?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    if (!supabase) return setError("Supabase isn't configured.");
    if (!file.type.startsWith("image/")) return setError("That file isn't an image.");
    if (file.size > MAX_BYTES) return setError("That image is over 5 MB — please use a smaller one.");

    setBusy(true);
    try {
      const objectUrl = URL.createObjectURL(file);
      const size = await measureImage(objectUrl).finally(() => URL.revokeObjectURL(objectUrl));

      // Unique path so a replaced image is never served from a stale cache.
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "image";
      const path = `${folder}/${Date.now().toString(36)}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { cacheControl: "31536000", contentType: file.type });
      if (uploadError) throw uploadError;

      onChange(supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl, size);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <div className="adm-image">
        {value ? (
          // Plain <img>: this is a small admin preview, and the source may not be an optimisable host yet.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="adm-image-preview" />
        ) : (
          <div className="adm-image-preview adm-image-empty">No image</div>
        )}
        <div className="adm-image-actions">
          <input
            ref={input}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />
          <button type="button" className="adm-button" disabled={busy} onClick={() => input.current?.click()}>
            {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
          </button>
          {value && allowRemove && (
            <button type="button" className="adm-button adm-button-quiet" disabled={busy} onClick={() => onChange("", null)}>
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <span className="adm-error">{error}</span>}
      {hint && <span className="adm-hint">{hint}</span>}
    </div>
  );
}
