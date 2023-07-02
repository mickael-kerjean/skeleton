import { withEffect, animate } from "../../skeleton/index.js";

export default rxjs.Observable.create((view) => {
    view.next(`
        <div class="component_wasmpage">
            <h1>
                <back-button></back-button>
                Wasm
            </h1>
            <p data-bind="now"></p>
        </div>
    `);
});

export function onMount($node) {
    console.log("EXECUTE WASM");
    // TODO: send some variable to wasm which spit back a string which we can render
}
