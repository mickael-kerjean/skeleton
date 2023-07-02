import rxjs from "../../skeleton/rxjs/index.js";

export function useForm$($node, inputNames) { // TODO: handle input, select, 
    const input$ = (name) => {
        const $el = $node.querySelector(`[name="${name}"]`);
        if (!$el) throw new Error("unknown: " + name);
        return rxjs.fromEvent($el, "input").pipe(
            rxjs.map((e) => ({ $el: e.target, touched: true })),
            rxjs.startWith({ $el, touched: false }),
            rxjs.map(({ $el, touched }) => ({
                $el, touched,
                name: $el.getAttribute("name"),
                value: $el.value,
            })),
        );
    };
    return rxjs.combineLatest(inputNames.map((sel) => input$(sel))).pipe(
        rxjs.shareReplay({ bufferSize: 1, refCount: true }),
    );
}

export const toJSON = rxjs.map((names) => names.reduce((acc, { name, value }) => {
    if (!name) return acc;
    acc[name] = value;
    return acc;
}, {}));



const fn = (op) => {
    rxjs.from([1,2,3,4])
        .pipe(op((x) => rxjs.of(x).pipe(rxjs.timer(1000))))
        .subscribe((d) => console.log(d));
}
