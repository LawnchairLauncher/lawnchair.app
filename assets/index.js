let url = "https://lawnchair.app/live-information.json";

async function getElements(urlParams) {
  const response = await fetch(url);
  const json = await response.json();
  const testMode = urlParams.get("showTests") ? true : false

  let empty = [];

  json.announcements.forEach((announcement) => {
    const { text, active, test } = announcement;

    console.log(text, active, test);

    if (testMode) empty.push(false);

    if (active) {
      if (!test) empty.push(false);
    }
  });

  console.log(empty.length);

  if (empty.length == 0) return;

  function buildEntry(text, url, active, test) {
    if (!testMode) { if (test) return }
    
    return `<${url ? `a href="${url}"` : "span"} class="${
      active ? "" : "in"
    }active">${text}</${url ? "a" : "span"}>`;
  }

  function buildAllEntries(obj) {
    let links = "";

    obj.announcements.forEach((announcement) => {
      const { text, url, active, test } = announcement;
      const entry = buildEntry(text, url, active, test);

      if (!entry) return;

      const link = `<li>${entry}</li>`;
      links += link;
    });

    return `<ul>${links}</ul><button class="hero__notice__button" title="Close this announcement">X</button>`;
  }

  const obj = await buildAllEntries(json);

  document.querySelector(".hero__notice").style.display = "flex";
  document.querySelector(".hero__notice").innerHTML = obj;

  document
    .querySelector(".hero__notice__button")
    .addEventListener("click", () => {
      document.querySelector(".hero__notice").style.display = "none";
    });
}

const urlParams = new URLSearchParams(window.location.search);

getElements(urlParams);
