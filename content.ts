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
    const code = pre.innerText
    const html = await marked.parse(code)

    const PageContainer = document.createElement("div")
    PageContainer.classList.add("page-container")

    const MarkdownEditor = document.createElement("textarea")
    MarkdownEditor.classList.add("markdown-editor")
    MarkdownEditor.id = "markdown-editor"
    MarkdownEditor.innerHTML = code
    MarkdownEditor.addEventListener("input", updatePreview)
    MarkdownEditor.addEventListener("keydown", updatePreview)
    PageContainer.appendChild(MarkdownEditor)

    const MarkdownPreview = document.createElement("div")
    MarkdownPreview.classList.add("markdown-body")
    MarkdownPreview.classList.add("markdown-preview")
    MarkdownPreview.id = "markdown-preview"
    MarkdownPreview.innerHTML = html
    PageContainer.appendChild(MarkdownPreview)

    body.replaceChildren(PageContainer)
  }
}

let UpdatePreviewTimeout = null
async function updatePreview(event: InputEvent) {
  if (UpdatePreviewTimeout) {
    clearTimeout(UpdatePreviewTimeout)
  }

  UpdatePreviewTimeout = window.setTimeout(updatePreviewDebounced, 200, event)
}

async function updatePreviewDebounced(event: InputEvent) {
  if (event.target instanceof HTMLTextAreaElement) {
    const code = event.target.value
    const html = await marked.parse(code)

    const MarkdownPreview = document.getElementById("markdown-preview")
    MarkdownPreview.innerHTML = html
  }
}
