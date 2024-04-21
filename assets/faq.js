const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("disabletoc")) {
  console.log("Disabled TOC due to flag <code>disableTOC</code>");
} else {
  let tocContents = "";
  let level = 0;

  document.getElementById("contents").innerHTML = document
    .getElementById("contents")
    .innerHTML.replace(
      /<h([\d]) id="([^<]+)">([^<]+)<\/h([\d])>/gi,
      function (str, openLevel, anchor, titleText, closeLevel) {
        if (openLevel != closeLevel) {
          return str;
        }

        if (openLevel > level) {
          tocContents += new Array(openLevel - level + 1).join("<ul>");
        } else if (openLevel < level) {
          tocContents += new Array(level - openLevel + 1).join("</ul>");
        }

        level = parseInt(openLevel);

        tocContents += `<li><a href="#${anchor}">${titleText}</a></li>`;

        return `<h${openLevel} id="${anchor}"><a href="#${anchor}" title="Permanent link to ${titleText}">${titleText}</a></h${closeLevel}>`;
      }
    );

  if (level) {
    tocContents += new Array(level + 1).join("</ul>");
  }

  tocContents =
    '<p><span>Table of Contents</span><button title="Show/Hide the Table of Contents.">Show</button></p>' +
    tocContents;

  const toc = document.getElementById("toc");
  toc.innerHTML = tocContents;

  const tocToggle = document.querySelector("button");

  tocToggle.addEventListener("click", () => {
    if (toc.classList.contains("collapsed")) {
      toc.classList.remove("collapsed");
      tocToggle.innerHTML = "Hide";
    } else {
      toc.classList.add("collapsed");
      tocToggle.innerHTML = "Show";
    }
  });
}
