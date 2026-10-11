"use client";

// Small form building blocks shared by the admin editors.

import { useEffect, useId, useState } from "react";

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
  return (
    <Field label={label} hint={hint}>
      <textarea className="adm-input adm-textarea" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
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
