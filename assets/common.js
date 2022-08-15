window.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.backgroundColor =
      "var(--lawnchair-background-color--lighter)";
  } else {
    document.querySelector("header").style.backgroundColor = "";
  }
};
