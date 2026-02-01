import fs from "fs/promises";
import path from "path";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { parseMetadata, findMetadataValue, formatDateString } from "./core.js";
import * as components from "../components/index.js";

const rootDir = process.cwd();

const metadataLastModifiedKeys = ["last modified"];
const metadataFirstPublishedKeys = ["first published"];

/**
 * Configure marked with default options.
 */
export function configureMarked() {
  marked.use({
    gfm: true,
    breaks: false
  });
}

/**
 * Remove markdown-related scripts from the document.
 */
export function removeMarkdownScript(document) {
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

/**
 * Render markdown into a target element.
 */
export async function renderMarkdownIntoTarget(target, markdownSource, authors) {
  const markdown = await fs.readFile(markdownSource, "utf-8").catch(() => {
    throw new Error(`Missing markdown file: ${markdownSource}`);
  });
  const parsed = parseMetadata(markdown);
  const html = marked.parse(parsed.content);

  const wrapperDom = new JSDOM(`<div id="wrapper">${html}</div>`);
  const wrapperDoc = wrapperDom.window.document;
  const wrapper = wrapperDoc.getElementById("wrapper");

  // Build context for components
  const lastModifiedRaw = findMetadataValue(parsed.metadata, metadataLastModifiedKeys);
  const firstPublishedRaw = findMetadataValue(parsed.metadata, metadataFirstPublishedKeys);
  const authorRaw = parsed.metadata.authors || parsed.metadata.author;
  const lastModified = formatDateString(lastModifiedRaw);
  const firstPublished = formatDateString(firstPublishedRaw);
  const wantsToc = target.getAttribute("data-toc") === "true";

  const context = {
    metadata: parsed.metadata,
    authors,
    authorRaw,
    firstPublished,
    lastModified,
    wantsToc
  };

  // Run component pipeline
  const pipeline = [
    components.headingIds,
    components.admonitions,
    components.metadataInfo,
    components.authorCards,
    components.toc
  ];

  for (const component of pipeline) {
    await component.transform(wrapperDoc, wrapper, context);
  }

  target.innerHTML = wrapper.innerHTML;
}

/**
 * Process a single HTML file.
 */
export async function processHtmlFile(filePath, authors) {
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
      ? path.join(rootDir, source.replace(/^\//, ""))
      : path.join(path.dirname(filePath), source);

    await renderMarkdownIntoTarget(target, markdownPath, authors);
  }

  await fs.writeFile(filePath, dom.serialize(), "utf-8");
}
