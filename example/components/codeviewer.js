class CodeViewer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = this.render({ content: "" });
    }

    static get observedAttributes() {
        return ["src"];
    }

    attributeChangedCallback() {
        const url = this.getAttribute("src");
        if (!url) return this.innerHTML = this.render({ content: "" });

        this.cleanup = new AbortController();
        fetch(url, { signal: this.cleanup.signal}).then((a) => a.text()).then((content) => {
            this.innerHTML = this.render({ content, url });
        }).catch(() => {});
    }

    disconnectedCallback() {
        if (this.cleanup) this.cleanup.abort()
    }

    render({ content = "", url = "" }) {
        if (content.length === 0) {
            return `<div>
               <style>${CSS}</style>
               <pre><code></code></pre>
          </div>`;
        }
        const language = /\.js$/.test(url) ? "js" : "html";
        if (language === "html") {
            content = "<!-- Source: " + url + " -->\n<!-- or right click and view page source -->\n"+content
        } else {
            content = "// source: " + url + "\n\n"+content
        }
        const html = hljs.highlight(content, {language}).value;
        return `
           <div>
               <style>${CSS}</style>
               <pre><code class="language-${language}">${html}</code></pre>
          </div>`;
    }
}

const CSS = `
#codeviewer-app pre {
   animation-name: comin;
   animation-duration: 600ms;
   animation-delay: 0ms;
}
@keyframes comin {
  from { opacity: 0;}
  to { opacity: 1;}
}
`

window.customElements.define("component-codeviewer", CodeViewer);
