import { destructor } from "../../skeleton/index.js";
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
