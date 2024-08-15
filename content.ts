import { marked } from "marked"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*.md", "http://*/*.md", "file:///*/*.md"],
  all_frames: true,
  css: require("./content.css")
}

const currentURL = window.location.pathname

if (currentURL.endsWith(".md")) {
  loadUI().then().catch(console.error)
}

async function loadUI() {
  const body = document.querySelector("body")
  const pre = document.querySelector("pre")

  if (pre) {
    const code = pre.innerHTML
    const html = await marked.parse(code)

    const div = document.createElement("div")
    div.classList.add("markdown-body")
    div.classList.add("markdown-preview")
    div.id = "markdown-preview"
    div.innerHTML = html

    body.replaceChildren(div)
  }
}
