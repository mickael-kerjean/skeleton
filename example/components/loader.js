class Loader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = this.render()
    }

    render() {
        // taken from: https://loading.io/css/
        return `
<div style="text-align: center; padding-top: 100px;">
    <style>${CSS}</style>
    <div class="lds-dual-ring"></div>
</div>
`
    }
}

const CSS = `
.lds-dual-ring {
  display: inline-block;  
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--primary);
  border-color: var(--primary) transparent var(--primary) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`;

window.customElements.define("component-loader", Loader);
