import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";
import "../components/back-button.js"

export default function(render) {
    const $page = createElement(`
        <div class="component_dom">
            <h1>
                <component-back></component-back>
                Event Handling
            </h1>
            <p>
                position: <strong data-bind="position"></strong><br/><br/>
                debounced: <strong data-bind="debounced-position"></strong><br/><br/>
                throttled: <strong data-bind="throttled-position"></strong><br/><br/>
             </p>
        </div>
   `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const mousemove$ = rxjs.fromEvent(window, "mousemove").pipe(
        rxjs.map((event) => `X[${event.clientX}] Y[${event.clientY}]`),
    );

    withEffect(mousemove$.pipe(
        textContent($page, `[data-bind="position"]`),
    ));

    withEffect(mousemove$.pipe(
        rxjs.debounce(() => rxjs.timer(500)),
        textContent($page, `[data-bind="debounced-position"]`)
    ));

    withEffect(mousemove$.pipe(
        rxjs.throttle(() => rxjs.timer(500)),
        textContent($page, `[data-bind="throttled-position"]`)
    ));    
};
