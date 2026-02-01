import { el } from "../lib/core.js";

const alertTitles = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution"
};

const headingTags = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

function createMarkdownAlert(doc, typeKey, inlineText) {
  const titleText = alertTitles[typeKey];
  if (!titleText) {
    return null;
  }

  const titleEl = el(doc, "p", {
    className: "markdown-alert-title",
    textContent: titleText
  });
  const inlinePara = inlineText ? el(doc, "p", { textContent: inlineText }) : null;

  return el(
    doc,
    "div",
    { className: `markdown-alert markdown-alert-${typeKey}` },
    [titleEl, inlinePara]
  );
}

/**
 * Transform blockquotes and paragraphs with [!type] markers into alert boxes.
 */
export function transform(doc, wrapper, context) {
  const blockquotes = Array.from(wrapper.querySelectorAll("blockquote"));

  blockquotes.forEach((blockquote) => {
    const first = blockquote.firstElementChild;
    if (!first || first.tagName !== "P") {
      return;
    }

    const firstText = first.textContent.trim();
    const match = firstText.match(/^\[!(\w+)\]([\s\S]*)$/i);
    if (!match) {
      return;
    }

    const typeKey = match[1].toLowerCase();
    const inlineText = match[2].trim();
    const alert = createMarkdownAlert(doc, typeKey, inlineText);
    if (!alert) {
      return;
    }

    let node = first.nextSibling;
    while (node) {
      const next = node.nextSibling;
      alert.appendChild(node);
      node = next;
    }

    blockquote.replaceWith(alert);
  });

  const looseMarkers = Array.from(wrapper.querySelectorAll("p"));
  looseMarkers.forEach((paragraph) => {
    if (!paragraph.textContent) {
      return;
    }

    if (paragraph.closest("blockquote")) {
      return;
    }

    const trimmed = paragraph.textContent.trim();
    const match = trimmed.match(/^\[!(\w+)\]([\s\S]*)$/i);
    if (!match) {
      return;
    }

    const typeKey = match[1].toLowerCase();
    const inlineText = match[2].trim();
    const alert = createMarkdownAlert(doc, typeKey, inlineText);
    if (!alert) {
      return;
    }

    const siblingsToMove = [];
    let next = paragraph.nextSibling;
    while (next) {
      if (next.nodeType === 1) {
        const tag = next.tagName;
        if (headingTags.has(tag) || tag === "HR") {
          break;
        }
      }

      const current = next;
      next = next.nextSibling;
      siblingsToMove.push(current);
    }

    siblingsToMove.forEach((node) => {
      alert.appendChild(node);
    });

    paragraph.replaceWith(alert);
  });
}
