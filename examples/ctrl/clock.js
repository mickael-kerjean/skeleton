import { destructor } from "../../skeleton/lifecycle.js";
import "../components/back-button.js";

const CSS = `
.component_clockpage h1 a {
    color: #999;
    text-decoration: none;
    font-family: monospace;
}
`;

export default rxjs.Observable.create(async (view) => {
    const render = (d) => {
        view.next(`
            <div class="component_clockpage">
                <style>${CSS}</style>
                <h1>
                    <back-button></back-button>
                    Clock
                </h1>
                <p>${d.toLocaleDateString()} ${d.toLocaleTimeString()}</p>
            </div>
       `);
    };

    const stream = rxjs
          .interval(1000)
          .pipe(rxjs.startWith(0), rxjs.map(() => new Date()))
          .subscribe(render);

    destructor(() => {
        stream.unsubscribe();
    });
});

export function onInit($node) {
    destructor(() => new Promise((done) => {
        $node.animate( // in 2023, web animation is now a thing, no need for an extra library
            [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }],
            { duration: 1000 },
        ).onfinish = done;
    }));
}
