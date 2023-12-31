const CSS = `
.component_link {
    padding: 5px 0;
    text-decoration: none;
}
.component_link svg {
    width: 20px;
}
`
class BackButton extends HTMLElement {
    events = [];

    constructor() {
        super();
        if (window.navigation && window.navigation.canGoBack === false) {
            return;
        }
        this.innerHTML = this.render();
        
        const $link = this.querySelector(".component_link");
        $link.addEventListener("click", this.onClick);
        this.events.push(() => $link.removeEventListener("click", this.onClick));
    }

    onClick(e) {
        e.preventDefault();
        history.back();
    }

    disconnectedCallback() {
        this.events.map((cleanupFn) => cleanupFn());
    }

    render(content) {
         return `
<style>${CSS}</style>
<a class="component_link" href="/">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>back</title><path class="cls-1" d="M61.44,0A61.51,61.51,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0Zm5,45.27A7.23,7.23,0,1,0,56.14,35.13L35,56.57a7.24,7.24,0,0,0,0,10.15l20.71,21A7.23,7.23,0,1,0,66.06,77.62l-8.73-8.87,24.86-.15a7.24,7.24,0,1,0-.13-14.47l-24.44.14,8.84-9Z"/></svg>
</a>
`
    }
}

window.customElements.define("component-back", BackButton);
