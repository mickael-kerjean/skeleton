import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";

import "../components/back-button.js"

export default function(render) {
    const $page = createElement(`
        <div class="component_counterpage">
            <style>${CSS}</style>
            <h1>
                <component-back></component-back>
                Counter
            </h1>
            <span data-bind="count"></span>
            <p>
                <button on-click="minus10">-10</button>
                <button on-click="minus1">-1</button>
                <button on-click="plus1">+1</button>
                <button on-click="plus10">+10</button>
                <button on-click="plus100">+100</button>
            </p>
        </div>
    `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const DEFAULT_COUNTER_VALUE = 0;
    withEffect(rxjs.merge(
        rxjs.fromEvent($page.querySelector(`[on-click="minus1"]`), "click").pipe(rxjs.map(() => -1)),
        rxjs.fromEvent($page.querySelector(`[on-click="minus10"]`), "click").pipe(rxjs.map(() => -10)),
        rxjs.fromEvent($page.querySelector(`[on-click="plus1"]`), "click").pipe(rxjs.map(() => +1)),
        rxjs.fromEvent($page.querySelector(`[on-click="plus10"]`), "click").pipe(rxjs.map(() => +10)),
        rxjs.fromEvent($page.querySelector(`[on-click="plus100"]`), "click").pipe(rxjs.map(() => +100)),
    ).pipe(
        rxjs.startWith(0),
        rxjs.scan((acc, el) => acc + el, DEFAULT_COUNTER_VALUE),
        textContent($page, `[data-bind="count"]`),
    ));
};

const CSS = `
.component_counterpage button { width: 50px; display: inline-block; }
`;
