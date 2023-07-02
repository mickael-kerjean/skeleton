import { onDestroy } from "../index.js";

// https://github.com/ReactiveX/rxjs/issues/4416#issuecomment-620847759
const rxjs = await import("./vendor/rxjs.min.js");
const ajax = await import("./vendor/rxjs-ajax.min.js")

export default rxjs;
export { textContent, htmlContent, setAttribute, getAttribute, removeAttribute } from "./dom.js";
export { ajax };
export function withEffect(obs) {
    const tmp = obs.subscribe(() => {}, (err) => console.error("withEffect", err));
    onDestroy(() => tmp.unsubscribe());
}
