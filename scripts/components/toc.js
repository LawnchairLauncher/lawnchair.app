/**
 * Insert a table of contents placeholder.
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
