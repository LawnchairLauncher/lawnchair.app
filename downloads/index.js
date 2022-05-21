import { Octokit } from "https://cdn.skypack.dev/@octokit/core"

const octokit = new Octokit()

const getLatestRelease = async (repo) => {
    try {
        const data = (
            await octokit.request("GET /repos/{owner}/{repo}/releases", {
                owner: "lawnchairlauncher",
                repo: repo,
            })
        ).data[0]
        return {
            version: data.name.substr(data.name.search(/\d/)),
            downloadLink: data.assets[0].browser_download_url,
        }
    } catch {
        return null
    }
}

const repoNames = ["lawnchair", "lawnfeed", "lawnicons"]

const majorVersions = {
    lawnchair: "12",
    lawnfeed: "3",
    lawnicons: "1",
}

const getFallbackDownloadLink = (repo) =>
    `https://github.com/lawnchairlauncher/${repo}/releases`

repoNames.forEach(async (it) => {
    const latestRelease = await getLatestRelease(it)
    const versionSpan = document.querySelector(`#js-${it}-version`)
    const downloadAnchor = document.querySelector(`#js-${it}-download`)
    versionSpan.textContent = `Version ${
        latestRelease ? latestRelease.version : majorVersions[it]
    }`
    downloadAnchor.href = latestRelease
        ? latestRelease.downloadLink
        : getFallbackDownloadLink(it)
    versionSpan.classList.remove("disabled")
    downloadAnchor.classList.remove("disabled")
})
