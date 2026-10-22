import { Fragment, type ReactNode } from "react";

/*
 * Renders the light formatting the admin editor writes into text fields:
 *   ***bold italic***  **bold**  *italic*  ++underline++  ~~strikethrough~~  [label](https://…)
 * plus line breaks. It builds React elements — never raw HTML — so stored text can't inject markup.
 */

const PATTERN =
  /\*\*\*([^]+?)\*\*\*|\*\*([^]+?)\*\*|\*([^\s*](?:[^]*?[^\s])?)\*|\+\+([^]+?)\+\+|~~([^]+?)~~|\[([^\]\n]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/;

function withBreaks(text: string, key: string): ReactNode[] {
  return text.split("\n").map((line, i) => (
    <Fragment key={`${key}-${i}`}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

function renderInline(text: string, key: string, links: boolean): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let i = 0;

  while (rest) {
    const match = PATTERN.exec(rest);
    if (!match) {
      out.push(...withBreaks(rest, `${key}-t${i}`));
      break;
    }
    if (match.index > 0) out.push(...withBreaks(rest.slice(0, match.index), `${key}-t${i}`));

    const k = `${key}-${i++}`;
    const [, boldItalic, bold, italic, underline, strike, label, href] = match;
    if (boldItalic !== undefined) out.push(<strong key={k}><em>{renderInline(boldItalic, k, links)}</em></strong>);
    else if (bold !== undefined) out.push(<strong key={k}>{renderInline(bold, k, links)}</strong>);
    else if (italic !== undefined) out.push(<em key={k}>{renderInline(italic, k, links)}</em>);
    else if (underline !== undefined) out.push(<u key={k}>{renderInline(underline, k, links)}</u>);
    else if (strike !== undefined) out.push(<s key={k}>{renderInline(strike, k, links)}</s>);
    else if (links) {
      out.push(
        <a key={k} href={href} {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
          {renderInline(label, k, links)}
        </a>
      );
    } else out.push(<Fragment key={k}>{renderInline(label, k, links)}</Fragment>);

    rest = rest.slice(match.index + match[0].length);
  }

  return out;
}

/**
 * Formatted text for use inside a <p> or <span>. Pass `links={false}` when the text sits inside
 * something already clickable (a card that is a link), so links show as plain text.
 */
export function RichText({ text, links = true }: { text: string; links?: boolean }) {
  return <>{renderInline(text, "r", links)}</>;
}
