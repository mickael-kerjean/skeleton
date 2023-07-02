import "../components/back-button.js"; // <component-back></component-back>

export default function(render){
    render(`
        <div class="component_componentpage">
            <h1>
                <component-back></component-back>
                Components
            </h1>
            <component-introduction></component-introduction>
        </div>
   `);
};


// let's create a custom web component
class ComponentIntroduction extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
<p class="component_introduction box">    
    <a href="./component2" class="button" data-link>Using a design system</a>
    <br/>
    <a href="./component3" class="button" data-link>Handling props in custom components</a>
    <style>
        .component_introduction:before { content: "I am a web component"; color: #ccc; display: block; margin-bottom: 10px; }
    </style>
</p>`;
    }
}
window.customElements.define("component-introduction", ComponentIntroduction);
