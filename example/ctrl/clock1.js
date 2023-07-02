import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";

import "../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_clockpage">
            <h1>
                <component-back></component-back>
                Clock 2/3 (reactive style)
            </h1>
            <p data-bind="date"></p>

            <a class="button" href="./clock2" data-link>nicer version</a>
        </div>
   `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const observable$ = rxjs.interval(1000).pipe(        // tic every second
        rxjs.startWith(0),                               // ensure we don't wait 1s before seeing the time
        rxjs.map(() => new Date().toLocaleTimeString()), // the stream contains the time
        textContent($page, `[data-bind="date"]`),        // update the dom
    );
    withEffect(observable$); // withEffect is merely syntaxic sugar to start the observable
                             // and unsubscribe when unmounting

};
