import { el } from "../lib/core.js";

/**
 * Insert a table of contents populated with heading links.
 */
export function transform(doc, wrapper, context) {
  const { wantsToc } = context;

  if (!wantsToc) {
    return;
  }

  const tocInline = wrapper.querySelector("toc-inline");
  const toc = doc.createElement("div");
  toc.id = "toc";
  toc.className = "collapsed";

  const headings = Array.from(wrapper.querySelectorAll("h2, h3"));
  if (headings.length) {
    const title = el(doc, "p", { className: "toc-title", textContent: "Table of Contents" });
    toc.appendChild(title);

    const list = doc.createElement("ul");
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1], 10);
      const link = el(doc, "a", { href: `#${heading.id}`, textContent: heading.textContent });
      const item = el(doc, "li", { className: `toc-level-${level}` }, [link]);
      list.appendChild(item);
    });
    toc.appendChild(list);
  }

  if (tocInline) {
    const parent = tocInline.parentElement;
    if (parent && parent.tagName === "P") {
      parent.replaceWith(toc);
    } else {
      tocInline.replaceWith(toc);
    }
  } else {
    wrapper.insertBefore(toc, wrapper.firstChild);
  }
}
