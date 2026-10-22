"use client";

// Small form building blocks shared by the admin editors.

import { useEffect, useId, useRef, useState } from "react";
import { RichText } from "@/components/RichText";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </label>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  hint,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: "text" | "url" | "email";
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        className="adm-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

const FORMATS = [
  { marker: "**", label: "B", title: "Bold (⌘B)", key: "b", className: "adm-format-bold" },
  { marker: "*", label: "I", title: "Italic (⌘I)", key: "i", className: "adm-format-italic" },
  { marker: "++", label: "U", title: "Underline (⌘U)", key: "u", className: "adm-format-underline" },
  { marker: "~~", label: "S", title: "Strikethrough", key: "", className: "adm-format-strike" },
] as const;

/**
 * A multi-line text box with a formatting toolbar. Formatting is stored as markers in the text
 * (**bold**, *italic*, ++underline++, ~~strike~~, [label](url)) and rendered by <RichText>.
 */
export function TextArea({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  const id = useId();
  const ref = useRef<HTMLTextAreaElement>(null);

  // Replaces the selection with before + text + after, then reselects the text.
  const insert = (before: string, after: string, fallback: string) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    // Clicking again on already-formatted text removes the formatting.
    if (value.slice(start - before.length, start) === before && value.slice(end, end + after.length) === after) {
      onChange(value.slice(0, start - before.length) + value.slice(start, end) + value.slice(end + after.length));
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start - before.length, end - before.length);
      });
      return;
    }
    const text = value.slice(start, end) || fallback;
    onChange(value.slice(0, start) + before + text + after + value.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + text.length);
    });
  };

  const addLink = () => {
    const url = window.prompt("Link address (https://… or mailto:…)", "https://");
    if (!url || !/^(https?:\/\/|mailto:)\S+$/i.test(url.trim())) return;
    insert("[", `](${url.trim()})`, "link text");
  };

  return (
    <div className="adm-field">
      <label htmlFor={id} className="adm-label">
        {label}
      </label>
      <div className="adm-format-bar" role="toolbar" aria-label={`Formatting for ${label}`}>
        {FORMATS.map((format) => (
          <button
            key={format.marker}
            type="button"
            className={`adm-format-button ${format.className}`}
            title={format.title}
            aria-label={format.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => insert(format.marker, format.marker, "text")}
          >
            {format.label}
          </button>
        ))}
        <button type="button" className="adm-format-button" title="Link" aria-label="Link" onMouseDown={(e) => e.preventDefault()} onClick={addLink}>
          Link
        </button>
      </div>
      <textarea
        id={id}
        ref={ref}
        className="adm-input adm-textarea"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (!(e.metaKey || e.ctrlKey)) return;
          const format = FORMATS.find((f) => f.key && f.key === e.key.toLowerCase());
          if (!format) return;
          e.preventDefault();
          insert(format.marker, format.marker, "text");
        }}
      />
      {/[*+~[]/.test(value) && (
        <div className="adm-format-preview" aria-label="Preview">
          <RichText text={value} links={false} />
        </div>
      )}
      {hint && <span className="adm-hint">{hint}</span>}
    </div>
  );
}

/**
 * A text box for a comma-separated list ("React, TypeScript"). Keeps its own text while typing so a
 * trailing comma or space isn't stripped mid-word; `resetKey` re-syncs it when a different item is opened.
 */
export function CommaListInput({
  label,
  value,
  onChange,
  hint,
  resetKey,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  hint?: string;
  resetKey: string;
}) {
  const [text, setText] = useState(value.join(", "));

  useEffect(() => {
    setText(value.join(", "));
    // Only when another item is opened — not on every keystroke's parsed value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return (
    <Field label={label} hint={hint}>
      <input
        className="adm-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(
            e.target.value
              .split(",")
              .map((part) => part.trim())
              .filter(Boolean)
          );
        }}
      />
    </Field>
  );
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  const id = useId();
  return (
    <div className="adm-check">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/** Move up / move down / delete buttons for one row of a list. */
export function RowControls({
  index,
  count,
  onMove,
  onDelete,
  itemName,
}: {
  index: number;
  count: number;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
  itemName: string;
}) {
  return (
    <span className="adm-row-controls">
      <button type="button" className="adm-icon-button" disabled={index === 0} onClick={() => onMove(-1)} aria-label={`Move ${itemName} up`} title="Move up">
        ↑
      </button>
      <button type="button" className="adm-icon-button" disabled={index === count - 1} onClick={() => onMove(1)} aria-label={`Move ${itemName} down`} title="Move down">
        ↓
      </button>
      <button type="button" className="adm-icon-button adm-icon-button-danger" onClick={onDelete} aria-label={`Delete ${itemName}`} title="Delete">
        ✕
      </button>
    </span>
  );
}

/** Returns a copy of `list` with the item at `index` moved one place up (-1) or down (1). */
export function moveItem<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function replaceAt<T>(list: T[], index: number, item: T): T[] {
  return list.map((existing, i) => (i === index ? item : existing));
}

export function removeAt<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

/** A short unique id for a new item, e.g. "article-m4k2x9a1". */
export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
}

/**
 * A list on the left, a form for the selected item on the right. Used for any section that is a
 * plain list of items (articles, certifications, photos).
 */
export function MasterDetail<T>({
  items,
  onChange,
  getKey,
  getLabel,
  createItem,
  renderForm,
  itemName,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  getKey: (item: T, index: number) => string;
  getLabel: (item: T) => string;
  createItem: () => T;
  renderForm: (item: T, update: (item: T) => void) => React.ReactNode;
  /** Singular, lower case: "article". */
  itemName: string;
}) {
  const [selected, setSelected] = useState(0);
  const index = Math.min(selected, items.length - 1);
  const current = items[index];

  return (
    <div className="adm-split">
      <div className="adm-list">
        {items.map((item, i) => (
          <div key={getKey(item, i)} className={i === index ? "adm-list-row adm-list-row-active" : "adm-list-row"}>
            <button type="button" className="adm-list-select" onClick={() => setSelected(i)} aria-current={i === index}>
              {getLabel(item) || `Untitled ${itemName}`}
            </button>
            <RowControls
              index={i}
              count={items.length}
              itemName={getLabel(item) || itemName}
              onMove={(direction) => {
                onChange(moveItem(items, i, direction));
                if (i === index) setSelected(i + direction);
                else if (i + direction === index) setSelected(i);
              }}
              onDelete={() => {
                onChange(removeAt(items, i));
                if (i < index) setSelected(index - 1);
              }}
            />
          </div>
        ))}
        {items.length === 0 && <p className="adm-empty">No {itemName}s yet.</p>}
        <button
          type="button"
          className="adm-button"
          onClick={() => {
            onChange([...items, createItem()]);
            setSelected(items.length);
          }}
        >
          + Add {itemName}
        </button>
      </div>

      <div className="adm-form">
        {current ? (
          <div key={getKey(current, index)} className="adm-form-fields">
            {renderForm(current, (item) => onChange(replaceAt(items, index, item)))}
          </div>
        ) : (
          <p className="adm-empty">Add {/^[aeiou]/.test(itemName) ? "an" : "a"} {itemName} to get started.</p>
        )}
      </div>
    </div>
  );
}
