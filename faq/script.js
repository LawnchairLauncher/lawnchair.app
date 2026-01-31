const urlParams = new URLSearchParams(window.location.search);

function initToc() {
  if (urlParams.get("disabletoc")) {
    console.log("Disabled TOC due to flag <code>disableTOC</code>");
    return;
  }

  let tocContents = "";
  let level = 0;

  const contents = document.getElementById("contents");
  if (!contents) {
    return;
  }

  contents.innerHTML = contents.innerHTML.replace(
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
  if (!toc) {
    return;
  }

  toc.innerHTML = tocContents;

  const tocToggle = document.querySelector("button");
  if (!tocToggle) {
    return;
  }

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

const contents = document.getElementById("contents");
if (contents && !contents.getAttribute("data-md")) {
  initToc();
} else {
  document.addEventListener("markdown:rendered", (event) => {
    if (event?.detail?.container?.id !== "contents") {
      return;
    }

    initToc();
  });
}
