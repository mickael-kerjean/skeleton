import { init as initRouter, currentRoute } from "./router.js";
import { init as initDOM } from "./lifecycle.js";

export { navigate } from "./router.js";
export { onDestroy } from "./lifecycle.js";

export default async function($root, routes, opts = {}) {
    const { spinner = "loading ...", spinnerTime = 200, defaultRoute = "/", onload = () => {} } = opts;

    await initDOM($root);
    await initRouter($root);

    window.addEventListener("pagechange", async () => {
        await $root.cleanup();
        const route = currentRoute(routes, defaultRoute);
        let ctrl;
        if (typeof route === "function") {
            ctrl = route;
        } else if (typeof route === "string") {
            const spinnerID = (typeof spinner === "string") && setTimeout(() => $root.innerHTML = spinner, spinnerTime);
            const module = await import(route);
            clearTimeout(spinnerID);
            if (typeof module.default !== "function") throw new Error("default export must be a function");
            ctrl = module.default;
        }
        if (typeof ctrl !== "function") throw new Error("unknown route for " + $root.outerHTML);
        ctrl((view) => {
            switch(typeof view) {
            case "string":
                $root.replaceChildren(createElement(view));
                break;
            case "object":
                $root.replaceChildren(view);
                break;
            case "function":
                view($root.firstChild);
                break;
            }
            onload();
        });
    });
}

export function createElement(str) {
    const $n = document.createElement("div");
    $n.innerHTML = str;
    return $n.firstElementChild;
}
