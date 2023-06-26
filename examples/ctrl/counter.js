import { destructor } from "../../skeleton/index.js";
import "../components/back-button.js"

const DEFAULT_VALUE = 0;

export default rxjs.Observable.create((view) => {
    view.next(`
<div class="component_counterpage">
    <style>${CSS}</style>
    <h1>
        <back-button></back-button>
        Counter
    </h1>
    <span data-bind="n">${DEFAULT_VALUE}</span>
    <p>
        <button on-click="minus1">-1</button>
        <button on-click="plus1">+1</button>
        <button on-click="plus10">+10</button>
    </p>
</div>`);
    view.complete();
});

export function onInit($app) {
    /////////////////////////////////////
    // business logic
    let n = DEFAULT_VALUE;
    const events$ = rxjs.merge(
        rxjs.fromEvent($app.querySelector(`[on-click="minus1"]`), "click").pipe(rxjs.map((e) => n-1)),
        rxjs.fromEvent($app.querySelector(`[on-click="plus1"]`), "click").pipe(rxjs.map((e) => n+1)),
        rxjs.fromEvent($app.querySelector(`[on-click="plus10"]`), "click").pipe(rxjs.map((e) => n+10)),
    ).subscribe((_n) => {
        $app.querySelector(`[data-bind="n"]`).textContent = _n;
        n = _n;
    });
    destructor(() => events$.unsubscribe());

    //////////////////////////////////////
    // handle animations
    $app.animate(
        [{transform: "translateX(5px)"}, {transform: "translateX(0)"}],
        { duration: 50 },
    );
    destructor(() => (new Promise((done) => {
        $app.animate(
            [{transform: "translateY(0)"}, {transform: "translateY(-10px)"}],
            { duration: 100 },
        ).onfinish = done;
    })));
}

const CSS = `
.component_counterpage button {
   padding: 5px 10px;
   background: #9AD1ED;
   border: none;
   color: #333;
   border-radius: 3px;
   cursor: pointer;
   font-size: 1rem;
}
`
