import { onDestroy, createElement } from "../../skeleton/index.js";
import { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";

import "../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_clockpage">
            <h1>
                <component-back></component-back>
                Clock 1/3 (imperative style)
            </h1>
            <p data-bind="date"></p>

            <a class="button" href="./clock1" data-link>declarative version</a>
        </div>
   `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    $page.querySelector(`[data-bind="date"]`).textContent = new Date().toLocaleTimeString();
    const id = setInterval(() => {
        $page.querySelector(`[data-bind="date"]`).textContent = new Date().toLocaleTimeString();
    }, 1000);
    onDestroy(() => clearInterval(id));
};
