import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent, setAttribute } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";

import "../components/back-button.js";
import "../components/clock.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_clockpage">
            <h1>
                <component-back></component-back>
                Clock 3/3
            </h1>

            <component-clock bind-hour="" bind-minute="" bind-second=""></component-clock>
            <p data-bind="now"></p>

            <a class="button" href="./" data-link>GO HOME</a>
            <style>${CSS}</style>
        </div>
    `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const tictac$ = rxjs.interval(10).pipe(rxjs.startWith(null), rxjs.map(() => new Date()));
    withEffect(tictac$.pipe(
        rxjs.map((d) => d.getSeconds()),
        setAttribute($page, "component-clock", "bind-second"),
    ));
    withEffect(tictac$.pipe(
        rxjs.map((d) => d.getMinutes()),
        setAttribute($page, "component-clock", "bind-minute"),
    ));
    withEffect(tictac$.pipe(
        rxjs.map((d) => d.getHours()),
        setAttribute($page, "component-clock", "bind-hour"),
    ));
    withEffect(tictac$.pipe(
        rxjs.map((d) => d.toLocaleTimeString()),
        textContent($page, `[data-bind="now"]`),
    ));
};

const CSS = `
.component_clockpage p { text-align: center; font-size: 1.5rem; }
`;
