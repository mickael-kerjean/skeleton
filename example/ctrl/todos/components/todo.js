import todoService from "../service.js";
import rxjs from "../../../../skeleton/rxjs/index.js";

const CSS = `
.component_todo {
    background: white;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
}

div[is="todo-item"][data-done="true"] {
    text-decoration: line-through;
}`
class TodoItem extends HTMLDivElement {
    onClickRemove$;
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.render({
            id: this.getAttribute("id"),
            label: this.getAttribute("data-name"),
            done: this.getAttribute("data-done"),
        });
        this.onClickRemove$ = rxjs.fromEvent(this, "click").subscribe(() => {
            todoService.done(this.getAttribute("id"));
        });
    }

    disconnectedCallback() {
        this.onClickRemove$.unsubscribe();
    }

    render({ id, label, done }) {
        return `
<style>${CSS}</style>
<div class="component_todo" id="${id}">
    ${label}
</div>
`
    }
}

window.customElements.define("todo-item", TodoItem, { extends: "div" });
