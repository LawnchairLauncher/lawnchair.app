(function () {
  const markedCdn = "https://cdn.jsdelivr.net/npm/marked@17.0.1/lib/marked.umd.js";
  const authorsJson = "/data/authors.json";
  const alertTitles = {
    note: "Note",
    tip: "Tip",
    important: "Important",
    warning: "Warning",
    caution: "Caution"
  };
  const metadataLastModifiedKeys = ["last modified"];
  const metadataFirstPublishedKeys = ["first published"];
  const headingTags = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
  const tocInlineSelector = "toc-inline";

  const iconMap = {
    github: "/images/github.svg",
    x: "/images/x.svg",
    mastodon: "/images/mastodon.svg",
  };

  /**
   * Helper to create DOM elements with attributes and children
   * @param {string} tag - Tag name
   * @param {object} props - Properties/Attributes
   * @param {Array|string|Node} children - Child nodes or text
   */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "dataset") {
        Object.assign(node.dataset, v);
      } else {
        node[k] = v;
      }
    });
    if (!Array.isArray(children)) children = [children];
    children.forEach((child) => {
      if (child === null || child === undefined) return;
      node.appendChild(
        typeof child === "string" ? document.createTextNode(child) : child
      );
    });
    return node;
  }

  if (window.customElements && !window.customElements.get(tocInlineSelector)) {
    window.customElements.define(tocInlineSelector, class TocInline extends HTMLElement {});
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function parseMetadata(markdown) {
    const match = markdown.match(/^\s*<!--[\s\S]*?-->\s*/);
    if (!match) {
      return { metadata: {}, content: markdown };
    }

    const rawBlock = match[0];
    const body = rawBlock.replace(/^\s*<!--|-->\s*$/g, "");

    const metadata = body.split("\n").reduce((acc, line) => {
      const [key, ...rest] = line.trim().split(/:\s*/);
      if (key && rest.length) {
        acc[key.toLowerCase()] = rest.join(": ").trim();
      }
      return acc;
    }, {});

    const content = markdown.slice(rawBlock.length);
    return { metadata, content };
  }

  async function loadAuthors() {
    if (loadAuthors.cache) {
      return loadAuthors.cache;
    }

    const fetchAuthors = async () => {
      try {
        const response = await fetch(authorsJson, { cache: "no-cache" });
        if (!response.ok) {
          throw new Error(`Failed to load ${authorsJson}: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !Array.isArray(data.authors)) {
          return {};
        }
        return data.authors.reduce((acc, author) => {
          if (author?.id) {
            acc[author.id.toLowerCase()] = author;
          }
          return acc;
        }, {});
      } catch (error) {
        console.warn("Unable to load author metadata.", error);
        return {};
      }
    };

    loadAuthors.cache = fetchAuthors();
    return loadAuthors.cache;
  }

  function parseAuthorList(value) {
    if (!value) {
      return [];
    }

    const trimmed = value.trim();
    if (!trimmed || trimmed === "[]") {
      return [];
    }

    const withoutBrackets = trimmed.replace(/^\[/, "").replace(/\]$/, "");
    const parts = withoutBrackets.split(/[,;]/).map((part) => part.trim());
    return parts.filter(Boolean);
  }

  function buildAuthorCard(author) {
    const name = el("p", {
      className: "author-name",
      textContent: author.name || author.id
    });
    const role = author.role
      ? el("p", { className: "author-role", textContent: author.role })
      : null;

    let linkWrap = null;
    const links = author.links || {};
    const linkEntries = Object.entries(links).filter(([, url]) => Boolean(url));
    if (linkEntries.length) {
      const linkNodes = linkEntries.map(([label, url]) => {
        const key = label.toLowerCase();
        const iconSrc = iconMap[key];

        const content = iconSrc
          ? el("img", { src: iconSrc, alt: label, loading: "lazy" })
          : label;
        return el("a", { href: url }, content);
      });
      linkWrap = el("div", { className: "author-links" }, linkNodes);
    }

    const content = el("div", { className: "author-content" }, [
      name,
      role,
      linkWrap
    ]);

    const avatar = author.avatar
      ? el("img", {
          className: "author-avatar",
          alt: author.name || author.id,
          src: author.avatar,
          loading: "lazy"
        })
      : null;

    return el("div", { className: "author-card" }, [avatar, content]);
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/<[^>]*>/g, "")              // Remove html tag <*>
      .replace(/\[[^\]]+\]\([^\)]+\)/g, "") // Remove markdown link [*](*)
      .replace(/`+/g, "")                   // Remove backticks `
      .replace(/\*+/g, "")                  // Remove asterisks *
      .replace(/[^a-z0-9\s-]/g, "")         // Remove special chars like ! and .
      .trim()                               // Remove leading and trailing whitespace
      .replace(/\s+/g, "-")                 // Replace spaces with hyphens -
      .replace(/-+/g, "-");                 // Remove duplicated hyphens
  }

  function formatDateString(value) {
    if (!value) {
      return value;
    }

    const isoMatch = value.match(/^\d{4}-\d{2}-\d{2}$/);
    if (!isoMatch) {
      return value;
    }

    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function ensureHeadingIds(container) {
    const headings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent || "");
      }
    });
  }

  function createMarkdownAlert(typeKey, inlineText) {
    const titleText = alertTitles[typeKey];
    if (!titleText) {
      return null;
    }

    const titleEl = el("p", {
      className: "markdown-alert-title",
      textContent: titleText
    });
    const inlinePara = inlineText
      ? el("p", { textContent: inlineText })
      : null;

    return el(
      "div",
      { className: `markdown-alert markdown-alert-${typeKey}` },
      [titleEl, inlinePara]
    );
  }

  function findMetadataValue(metadata, keys) {
    if (!metadata) {
      return undefined;
    }

    for (const key of keys) {
      if (metadata[key]) {
        return metadata[key];
      }
    }

    return undefined;
  }

  function insertMetadataInfo(title, firstPublished, lastModified) {
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

    const info = el("p", {
      className: "metadata",
      textContent: parts.join(" · ")
    });
    title.insertAdjacentElement("afterend", info);
  }

  function getAuthorAnchor(title) {
    if (!title) {
      return null;
    }

    return title.nextElementSibling?.classList.contains("metadata")
      ? title.nextElementSibling
      : title;
  }

  async function insertAuthorCards(title, authorRaw) {
    if (!title || !authorRaw) {
      return;
    }

    const authorIds = parseAuthorList(authorRaw);
    if (!authorIds.length) {
      return;
    }

    const authorData = await loadAuthors();
    const authorCards = document.createElement("div");
    authorCards.className = "author-cards";

    authorIds.forEach((id) => {
      const key = id.toLowerCase();
      const data = authorData[key] || { id, name: id };
      authorCards.appendChild(buildAuthorCard(data));
    });

    const anchor = getAuthorAnchor(title);
    if (anchor) {
      anchor.insertAdjacentElement("afterend", authorCards);
    }
  }

  // Custom markdown component: Admonitions
  function transformAdmonitions(container) {
    const blockquotes = Array.from(container.querySelectorAll("blockquote"));

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
      const alert = createMarkdownAlert(typeKey, inlineText);
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

    const looseMarkers = Array.from(container.querySelectorAll("p"));
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
      const alert = createMarkdownAlert(typeKey, inlineText);
      if (!alert) {
        return;
      }

      const siblingsToMove = [];
      let next = paragraph.nextSibling;
      while (next) {
        if (next.nodeType === Node.ELEMENT_NODE) {
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

  async function loadMarked() {
    if (window.marked) {
      return;
    }

    await loadScript(markedCdn);
  }

  function configureMarked() {
    if (window.marked.use && window.marked.Renderer && window.marked.Slugger) {
      const slugger = new window.marked.Slugger();
      const renderer = new window.marked.Renderer();

      renderer.heading = (text, level, raw) => {
        const id = slugger.slug(raw || text);
        return `<h${level} id=\"${id}\">${text}</h${level}>`;
      };

      window.marked.use({
        renderer,
        gfm: true,
        breaks: false,
        mangle: false
      });
    } else if (window.marked.setOptions) {
      window.marked.setOptions({
        gfm: true,
        breaks: false,
        mangle: false
      });
    }
  }

  async function fetchMarkdownSource(source) {
    const response = await fetch(source, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load ${source}: ${response.status}`);
    }
    return response.text();
  }

  function insertToc(target, wrapper, wantsToc) {
    if (!wantsToc) {
      return;
    }

    const tocInline = wrapper.querySelector(tocInlineSelector);
    const toc = document.createElement("div");
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
      target.appendChild(toc);
    }
  }

  function appendWrapperContent(target, wrapper) {
    while (wrapper.firstChild) {
      target.appendChild(wrapper.firstChild);
    }
  }

  async function renderMarkdownTarget(target) {
    const source = target.getAttribute("data-md");
    if (!source) {
      return;
    }

    const markdown = await fetchMarkdownSource(source);
    const parsed = parseMetadata(markdown);
    const html = window.marked.parse(parsed.content);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    ensureHeadingIds(wrapper);
    transformAdmonitions(wrapper);

    const lastModifiedRaw = findMetadataValue(parsed.metadata, metadataLastModifiedKeys);
    const firstPublishedRaw = findMetadataValue(parsed.metadata, metadataFirstPublishedKeys);
    const authorRaw = parsed.metadata.author || parsed.metadata.authors;
    const lastModified = formatDateString(lastModifiedRaw);
    const firstPublished = formatDateString(firstPublishedRaw);
    const title = wrapper.querySelector("h1");
    insertMetadataInfo(title, firstPublished, lastModified);
    await insertAuthorCards(title, authorRaw);

    const wantsToc = target.getAttribute("data-toc") === "true";
    target.innerHTML = "";
    insertToc(target, wrapper, wantsToc);
    appendWrapperContent(target, wrapper);

    document.dispatchEvent(
      new CustomEvent("markdown:rendered", {
        detail: {
          container: target,
          source
        }
      })
    );
  }

  async function renderMarkdownTargets() {
    try {
      await loadMarked();
      configureMarked();

      const targets = Array.from(document.querySelectorAll("[data-md]"));

      await Promise.all(
        targets.map((target) => renderMarkdownTarget(target))
      );
    } catch (error) {
      console.error("Markdown render failed", error);
      const targets = Array.from(document.querySelectorAll("[data-md]"));
      targets.forEach((target) => {
        target.innerHTML =
          "<p>Unable to load the page content. Please refresh or try again later.</p>";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMarkdownTargets);
  } else {
    renderMarkdownTargets();
  }
})();
