var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var parsedResponse = JSON.parse(this.responseText);
    document.querySelector(".hero__get-button").href =
      "https://storage.codebucket.de/lawnchair/" +
      parsedResponse.app_version +
      "/" +
      "Lawnfeed-" +
      parsedResponse.app_version +
      ".apk";
    document.querySelector(".hero__version-label").innerHTML =
      parsedResponse.app_version + ".";
  }
};
xmlhttp.open(
  "GET",
  "https://storage.codebucket.de/lawnchair/version.json",
  true
);
xmlhttp.send();
