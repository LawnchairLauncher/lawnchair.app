window.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.backgroundColor =
      "var(--surface-container-high)";
  } else {
    document.querySelector("header").style.backgroundColor = "";
  }
};