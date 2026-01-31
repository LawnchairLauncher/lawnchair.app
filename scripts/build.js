import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import { marked } from "marked";

const rootDir = process.cwd();
const outputDir = path.join(rootDir, "dist");
const ignoreDirs = new Set(["node_modules", "dist", ".git", ".github"]);
const authorsPath = path.join(outputDir, "data", "authors.json");

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

const iconMap = {
  github: "/images/github.svg",
  x: "/images/x.svg",
  mastodon: "/images/mastodon.svg"
};

function shouldCopy(sourcePath) {
  const rel = path.relative(rootDir, sourcePath);
  if (!rel) {
    return true;
  }
  const segment = rel.split(path.sep)[0];
  return !ignoreDirs.has(segment);
}

async function copyWorkspace() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }
    const source = path.join(rootDir, entry.name);
    const destination = path.join(outputDir, entry.name);
    await fs.cp(source, destination, {
      recursive: true,
      filter: shouldCopy
    });
  }
}

async function walkHtmlFiles(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!ignoreDirs.has(entry.name)) {
          await walkHtmlFiles(fullPath, results);
        }
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        results.push(fullPath);
      }
    })
  );
  return results;
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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, "")
    .replace(/`+/g, "")
    .replace(/\*+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
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

function el(doc, tag, props = {}, children = []) {
  const node = doc.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "dataset") {
      Object.assign(node.dataset, v);
    } else {
      node[k] = v;
    }
  });
  const normalized = Array.isArray(children) ? children : [children];
  normalized.forEach((child) => {
    if (child === null || child === undefined) {
      return;
    }
    node.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
  });
  return node;
}

function ensureHeadingIds(container) {
  const headings = Array.from(container.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent || "");
    }
  });
}

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

function transformAdmonitions(doc, container) {
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
    const alert = createMarkdownAlert(doc, typeKey, inlineText);
    if (!alert) {
      return;
    }

    const siblingsToMove = [];
    let next = paragraph.nextSibling;
    while (next) {
      if (next.nodeType === doc.defaultView.Node.ELEMENT_NODE) {
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

function insertMetadataInfo(doc, title, firstPublished, lastModified) {
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

function getAuthorAnchor(title) {
  if (!title) {
    return null;
  }

  return title.nextElementSibling?.classList.contains("metadata")
    ? title.nextElementSibling
    : title;
}

function buildAuthorCard(doc, author) {
  const name = el(doc, "p", {
    className: "author-name",
    textContent: author.name || author.id
  });
  const role = author.role
    ? el(doc, "p", { className: "author-role", textContent: author.role })
    : null;

  let linkWrap = null;
  const links = author.links || {};
  const linkEntries = Object.entries(links).filter(([, url]) => Boolean(url));
  if (linkEntries.length) {
    const linkNodes = linkEntries.map(([label, url]) => {
      const key = label.toLowerCase();
      const iconSrc = iconMap[key];

      const content = iconSrc
        ? el(doc, "img", { src: iconSrc, alt: label, loading: "lazy" })
        : label;
      return el(doc, "a", { href: url }, content);
    });
    linkWrap = el(doc, "div", { className: "author-links" }, linkNodes);
  }

  const content = el(doc, "div", { className: "author-content" }, [
    name,
    role,
    linkWrap
  ]);

  const avatar = author.avatar
    ? el(doc, "img", {
        className: "author-avatar",
        alt: author.name || author.id,
        src: author.avatar,
        loading: "lazy"
      })
    : null;

  return el(doc, "div", { className: "author-card" }, [avatar, content]);
}

async function insertAuthorCards(doc, title, authorRaw, authors) {
  if (!title || !authorRaw) {
    return;
  }

  const authorIds = parseAuthorList(authorRaw);
  if (!authorIds.length) {
    return;
  }

  const authorCards = doc.createElement("div");
  authorCards.className = "author-cards";

  authorIds.forEach((id) => {
    const key = id.toLowerCase();
    const data = authors[key] || { id, name: id };
    authorCards.appendChild(buildAuthorCard(doc, data));
  });

  const anchor = getAuthorAnchor(title);
  if (anchor) {
    anchor.insertAdjacentElement("afterend", authorCards);
  }
}

function insertToc(doc, wrapper, wantsToc) {
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

function removeMarkdownScript(document) {
  const scripts = Array.from(document.querySelectorAll("script[src]"));
  scripts.forEach((script) => {
    const src = script.getAttribute("src") || "";
    if (src.includes("/assets/markdown.js") || src.includes("assets/markdown.js")) {
      script.remove();
    }
    if (src.includes("marked.umd.min.js")) {
      script.remove();
    }
  });
}

async function loadAuthors() {
  try {
    const raw = await fs.readFile(authorsPath, "utf-8");
    const data = JSON.parse(raw);
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
}

function configureMarked() {
  if (marked.use && marked.Renderer && marked.Slugger) {
    const slugger = new marked.Slugger();
    const renderer = new marked.Renderer();

    renderer.heading = (text, level, raw) => {
      const id = slugger.slug(raw || text);
      return `<h${level} id=\"${id}\">${text}</h${level}>`;
    };

    marked.use({
      renderer,
      gfm: true,
      breaks: false,
      mangle: false
    });
  } else {
    marked.setOptions({
      gfm: true,
      breaks: false,
      mangle: false
    });
  }
}

async function renderMarkdownIntoTarget(target, markdownSource, authors) {
  const markdown = await fs.readFile(markdownSource, "utf-8");
  const parsed = parseMetadata(markdown);
  const html = marked.parse(parsed.content);

  const wrapperDom = new JSDOM(`<div id=\"wrapper\">${html}</div>`);
  const wrapperDoc = wrapperDom.window.document;
  const wrapper = wrapperDoc.getElementById("wrapper");

  ensureHeadingIds(wrapper);
  transformAdmonitions(wrapperDoc, wrapper);

  const lastModifiedRaw = findMetadataValue(parsed.metadata, metadataLastModifiedKeys);
  const firstPublishedRaw = findMetadataValue(parsed.metadata, metadataFirstPublishedKeys);
  const authorRaw = parsed.metadata.author || parsed.metadata.authors;
  const lastModified = formatDateString(lastModifiedRaw);
  const firstPublished = formatDateString(firstPublishedRaw);
  const title = wrapper.querySelector("h1");

  insertMetadataInfo(wrapperDoc, title, firstPublished, lastModified);
  await insertAuthorCards(wrapperDoc, title, authorRaw, authors);

  const wantsToc = target.getAttribute("data-toc") === "true";
  insertToc(wrapperDoc, wrapper, wantsToc);

  target.innerHTML = wrapper.innerHTML;
  target.removeAttribute("data-md");
}

async function processHtmlFile(filePath, authors) {
  const html = await fs.readFile(filePath, "utf-8");
  const dom = new JSDOM(html);
  const document = dom.window.document;

  removeMarkdownScript(document);

  const targets = Array.from(document.querySelectorAll("[data-md]"));
  for (const target of targets) {
    const source = target.getAttribute("data-md");
    if (!source) {
      continue;
    }

    const markdownPath = source.startsWith("/")
      ? path.join(outputDir, source.replace(/^\//, ""))
      : path.join(path.dirname(filePath), source);

    await renderMarkdownIntoTarget(target, markdownPath, authors);
  }

  await fs.writeFile(filePath, dom.serialize(), "utf-8");
}

async function run() {
  configureMarked();
  await copyWorkspace();
  const authors = await loadAuthors();
  const htmlFiles = await walkHtmlFiles(outputDir);

  for (const filePath of htmlFiles) {
    await processHtmlFile(filePath, authors);
  }

  console.log(`Build complete. Output in ${path.relative(rootDir, outputDir)}`);
}

run().catch((error) => {
  console.error("Build failed.", error);
  process.exit(1);
});
