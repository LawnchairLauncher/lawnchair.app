import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit();

const getLatestRelease = async (repo, index = 0) => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("disabledownloads")) {
    console.log("Disabled downloads due to flag <code>disableDownloads</code>");
    return null;
  }

  try {
    const data = (
      await octokit.request("GET /repos/{owner}/{repo}/releases", {
        owner: "lawnchairlauncher",
        repo: repo,
      })
    ).data[index];
    return {
      version: data.name.substr(data.name.search(/\d/)),
      downloadLink: data.assets[0].browser_download_url,
    };
  } catch {
    return null;
  }
};

const repoNames = ["lawnchair", "lawnfeed", "lawnicons"];

const majorVersions = {
  lawnchair: "14",
  lawnfeed: "3",
  lawnicons: "2",
};

const getFallbackDownloadLink = (repo) =>
  `https://github.com/lawnchairlauncher/${repo}/releases`;

// todo futureproof
repoNames.forEach(async (it) => {
  let latestRelease = await getLatestRelease(it);
  if (latestRelease.version == "y") {
    latestRelease = await getLatestRelease(it, 1);
  }
  const versionSpan = document.querySelector(`#js-${it}-version`);
  const downloadAnchor = document.querySelector(`#js-${it}-download`);
  versionSpan.textContent = `Version ${
    latestRelease ? latestRelease.version : majorVersions[it]
  }`;
  downloadAnchor.href = latestRelease
    ? latestRelease.downloadLink
    : getFallbackDownloadLink(it);
  versionSpan.classList.remove("disabled");
  downloadAnchor.classList.remove("disabled");
});
