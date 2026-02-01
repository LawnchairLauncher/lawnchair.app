import { slugify } from "../lib/core.js";

/**
 * Ensure all headings have unique IDs for anchor linking.
 */
export function transform(doc, wrapper, context) {
  const headings = Array.from(wrapper.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent || "");
    }
  });
}
