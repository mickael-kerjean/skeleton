import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";
import "../components/back-button.js"

export default function(render) {
    const $page = createElement(`
        <div class="component_dom">
            <h1>
                <component-back></component-back>
                Binding the DOM
            </h1>
            <p>
                <strong data-bind="counting"></strong>
             </p>
        </div>
   `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    withEffect(rxjs.interval().pipe(
        textContent($page, `[data-bind="counting"]`),
    ));
};
