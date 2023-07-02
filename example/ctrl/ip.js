import { createElement } from "../../skeleton/index.js";
import rxjs, { ajax, withEffect, textContent, htmlContent, setAttribute, getAttribute, removeAttribute } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition, slideXIn, slideXOut } from "../../skeleton/animate/index.js";

import "../components/back-button.js";

export default function(render) {
    let $page = createElement(`
        <div class="component_ippage">
            <style>${CSS}</style>
            <h1>
                <component-back></component-back>
                IP Location
            </h1>
            <p>
               <button class="button" on-click="refresh">REFRESH</button>
               <pre data-bind="ip"></pre>

               <div data-bind="iframe"></div>
            </p>
        </div>
    `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const request$ = rxjs.fromEvent($page.querySelector(`[on-click="refresh"]`), "click").pipe(
        rxjs.startWith(null),
        rxjs.switchMap(() => ajax.ajax("https://freeipapi.com/api/json").pipe(
            rxjs.map((c) => c.response),
            rxjs.catchError((err) => rxjs.of(err)),
        )),
        rxjs.share(),
    );

    // show the data in json
    withEffect(request$.pipe(
        rxjs.map((s) => JSON.stringify(s, null, 4)),
        textContent($page, `[data-bind="ip"]`),
    ));

    // the map with the location of the user
    withEffect(request$.pipe(
        rxjs.filter(({latitude, longitude}) => latitude && longitude),
        rxjs.map((r) => ({
            size: 0.5,
            lat: r.latitude,
            lon: r.longitude,
        })),
        rxjs.map((p) => `<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${p.lon-p.size}%2C${p.lat-p.size}%2C${p.lon+p.size}%2C${p.lat+p.size}&amp;layer=mapnik"></iframe>`),
        htmlContent($page, `[data-bind="iframe"]`),
    ));
};

const CSS = `
.component_ippage iframe {
    width: 100%;
    height: 300px;
    border: 5px solid rgba(0,0,0,0.1);
    border-radius: 3px;
}`;
