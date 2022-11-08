window.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.backgroundColor =
      "var(--lawnchair-background-color--lighter)";
  } else {
    document.querySelector("header").style.backgroundColor = "";
  }
};

response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
response.setHeader("Expires", "0"); // Proxies.