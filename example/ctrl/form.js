import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";
import "../components/back-button.js"

export default function(render) {
    const $page = createElement(`
        <div class="component_form">
            <style>${CSS}</style>
            <h1>
                <component-back></component-back>
                Form
            </h1>
            <p class="control">
                <input type="text" name="fullname" placeholder="Your Name"/>
                <input type="number" name="age" placeholder="Your age" />
            </p>
            <p>
                Hi, my name is <strong data-bind="fullname">___</strong> and I am <strong data-bind="age">__</strong> years old
            </p>
       </div>
    `);
    render($page);

    withEffect(rxjs.fromEvent($page.querySelector(`input[name="fullname"]`), "input").pipe(
        rxjs.map((e) => e.target.value || "____"),
        textContent($page, `[data-bind="fullname"]`),
    ));

    withEffect(rxjs.fromEvent($page.querySelector(`input[name="age"]`), "input").pipe(
        rxjs.map((e) => e.target.value || "__"),
        textContent($page, `[data-bind="age"]`),
    ));

    withEffect(animate($page).pipe(CSSTransition()));
};

const CSS = `
.component_form .control { display: flex; }
.component_form [name="age"] { max-width: 150px; }
`;
