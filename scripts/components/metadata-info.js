import { el } from "../lib/core.js";

/**
 * Insert publication date metadata below the title.
 */
export function transform(doc, wrapper, context) {
  const { firstPublished, lastModified } = context;
  const title = wrapper.querySelector("h1");

  if (!title || (!firstPublished && !lastModified)) {
    return;
  }

  const parts = [];
  if (firstPublished) {
    parts.push(`First published: ${firstPublished}`);
  }
  if (lastModified) {
    parts.push(`Last updated: ${lastModified}`);
  }

  const info = el(doc, "p", {
    className: "metadata",
    textContent: parts.join(" · ")
  });
  title.insertAdjacentElement("afterend", info);
}
