window.onscroll = function () {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.backgroundColor =
      "var(--accent-normal)";
  } else {
    document.querySelector("header").style.backgroundColor = "";
  }
};