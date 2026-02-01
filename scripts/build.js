import fs from "fs/promises";
import path from "path";
import { loadAuthors } from "./lib/authors.js";
import { configureMarked, processHtmlFile } from "./lib/markdown.js";

const rootDir = process.cwd();
const blogTemplatePath = path.join(rootDir, "scripts", "templates", "blog.html");

async function walkHtmlFiles(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkHtmlFiles(fullPath, results);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        results.push(fullPath);
      }
    })
  );
  return results;
}

async function findMarkdownDirs(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await findMarkdownDirs(fullPath, results);
      } else if (entry.isFile() && entry.name.toLowerCase() === "index.md") {
        results.push(path.dirname(fullPath));
      }
    })
  );
  return results;
}

async function getHtmlFilesSafely(dirs, templatePath) {
  const template = await fs.readFile(templatePath, "utf-8");
  let created = 0;

  for (const dir of dirs) {
    const htmlPath = path.join(dir, "index.html");
    try {
      await fs.access(htmlPath);
    } catch {
      await fs.writeFile(htmlPath, template, "utf-8");
      created++;
      console.log(`📄 Created ${path.relative(rootDir, htmlPath)}`);
    }
  }

  return created;
}

async function run() {
  configureMarked();
  const authors = await loadAuthors();
  const blogDir = path.join(rootDir, "blog");
  const faqDir = path.join(rootDir, "faq");

  // Find markdown files and create HTML from template if missing
  const markdownDirs = [];
  await findMarkdownDirs(blogDir, markdownDirs);
  await getHtmlFilesSafely(markdownDirs, blogTemplatePath);

  // Now find all HTML files and process them
  const htmlFiles = [];
  await walkHtmlFiles(blogDir, htmlFiles);
  await walkHtmlFiles(faqDir, htmlFiles);

  const results = await Promise.allSettled(
    htmlFiles.map((filePath) => processHtmlFile(filePath, authors))
  );

  const failures = results
    .map((r, i) => (r.status === "rejected" ? { file: htmlFiles[i], reason: r.reason } : null))
    .filter(Boolean);

  if (failures.length) {
    failures.forEach(({ file, reason }) => {
      console.error(`💥 Failed to process ${file}:`, reason.message || reason);
    });
    throw new Error(`💥 Build failed for ${failures.length} file(s).`);
  }

  const successCount = results.length - failures.length;
  console.log(`🥞 Build complete. Processed ${successCount} file(s).`);
}

run().catch((error) => {
  console.error("💥 Build failed.", error);
  process.exit(1);
});
