const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("disabletoc")) {
  console.log("Disabled TOC due to flag <code>disableTOC</code>");
} else {
  let tocContents = "";
  let level = 0;
  const linkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor" style="transform: rotate(90deg)">
  <path d="M0 0h24v24H0V0z" fill="none"/>
  <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
</svg>`;

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

        return `<h${openLevel} id="${anchor}"><a href="#${anchor}">${linkIcon}</a>${titleText}</h${closeLevel}>`;
      }
    );

  if (level) {
    tocContents += new Array(level + 1).join("</ul>");
  }

  tocContents =
    "<p><span>Table of Contents</span><button>Show</button></p>" + tocContents;

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
