import { createElement } from "../../skeleton/index.js";
import { withEffect } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";

import "../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_transition">
            <h1>
                <component-back></component-back>
                Transition 1/2
            </h1>

            <a class="button" href="./transition2" data-link>more transitions</a>
        </div>
   `);
    render($page);

    // enter and leave transition coming from the optional animation library
    withEffect(animate($page).pipe(CSSTransition()));
};

