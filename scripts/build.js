import fs from "fs/promises";
import path from "path";
import { loadAuthors } from "./lib/authors.js";
import { configureMarked, processHtmlFile } from "./lib/markdown.js";

const rootDir = process.cwd();

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

async function run() {
  configureMarked();
  const authors = await loadAuthors();
  const htmlFiles = [];
  const blogDir = path.join(rootDir, "blog");
  const faqDir = path.join(rootDir, "faq");
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
