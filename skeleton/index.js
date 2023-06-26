export { navigate } from "./router.js";
export { destructor } from "./lifecycle.js";
export { createElement } from "./dom.js";

import { init as initRouter, currentRoute } from "./router.js";
import { init as initDOM } from "./lifecycle.js";
import { createElement } from "./dom.js";

export default function($root, routes, { spinner = `loading...` }) {
    initDOM($root);
    initRouter($root).subscribe(async () => {
        await $root.cleanup();
        const spinner$ = rxjs.timer(100).subscribe(() => $root.replaceWith(createElement(spinner)));
        const _currentRoute = currentRoute(routes);
        let page;
        if (typeof _currentRoute === "string") {
            page = await import(_currentRoute);
        } else if (_currentRoute && typeof _currentRoute.subscribe === "function") {
            page = {default: _currentRoute};
        } else {
            throw new Error("unknown route");
        }
        spinner$.unsubscribe();
        page.default.subscribe(async (view) => {
            switch(typeof view) {
            case "string":
                $root.innerHTML = view;
                break;
            case "function":
                view($root);
                break;
            case "object":
                $root.replaceChildren(view);
                break;
            default:
                throw new Error("unknown view");
            }
            if (typeof page.onInit === "function") await page.onInit($root)
        });
    });
}
