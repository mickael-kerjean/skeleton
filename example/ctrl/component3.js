import "../components/back-button.js"; // <component-back></component-back>

export default function(render) {
    render(`
        <div class="component_componentpage">
            <h1>
                <component-back></component-back>
                Components
            </h1>
            <p>
                <component-withattribute color="#333" background-color="#eee"></component-withattribute>
            </p>
        </div>
   `);
};

class ComponentWithAttributes extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["color", "background-color"];
    }

    connectedCallback() {
        this.attributeChangedCallback();
    }

    attributeChangedCallback() {
        this.render({
            color: this.getAttribute("color") || "red",
            backgroundColor: this.getAttribute("background-color") || "blue",
        });
    }

    render({ color, backgroundColor }) {
        this.innerHTML = `
<div class="box">
    <h2>Edit my attributes from the dev console </h2>
    <marquee>Who need framework specific components when we can use the standard web component?</marquee>

    <h2> Nesting components </h2>
    <p>
        <component-back></component-back>
    </p>

    <p>
        Don't want your component style to affect each others? Use the
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM">shadow dom</a>
    </p>
    ${this.css({color, backgroundColor})}
</div>
`;
    }

    css({color, backgroundColor}) {
        return `
<style>
component-withattribute .box {    
    color: ${color};
    background-color: ${backgroundColor};
    border-radius: 3px;
    padding: 5px 20px;
    margin-top: 50px;
}
</style>`;
    }
}
window.customElements.define("component-withattribute", ComponentWithAttributes);
