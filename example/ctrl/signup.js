import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect, textContent } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../skeleton/animate/index.js";
import "../components/back-button.js"

export default function(render) {
    const $page = createElement(`
        <div class="component_form">
            <style>${CSS}</style>
            <h1>
                <component-back></component-back>
                Signup Form
            </h1>
            <form class="box" on-submit>
                <label>
                     Username*:
                    <input type="text" name="username" placeholder="username" data-required/><div></div>
                </label>
                <label>
                     Password* <span>(min 5 char)</span>:
                    <input type="password" name="password" placeholder="password" data-pattern="^.{5,}" data-required/><div></div>
                </label>
                <label>
                     Email:
                    <input type="text" name="email" placeholder="email"/><div></div>
                    <div></div>
                </label>
                <button>SUBMIT</button>
            </form>
            <pre data-bind="formData"></pre>
       </div>
    `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    const form$ = createForm$($page, ["username", "password", "email"]);

    // feature: display the form data in real time
    withEffect(form$.pipe(
        toJSON(),
        rxjs.map((f) => JSON.stringify(f, null, 4)),
        textContent($page, `[data-bind="formData"]`),
    ));

    // feature: form submission
    withEffect(rxjs.fromEvent($page.querySelector("form"), "submit").pipe(
        rxjs.tap((e) => e.preventDefault()),
        rxjs.switchMap(() => form$.pipe(rxjs.first())),
        toJSON(),
        rxjs.tap((json) => alert(JSON.stringify(json, null, 4))),
    ));

    // feature: validation
    withEffect(form$.pipe(
        rxjs.mergeMap((fields) => fields),
        rxjs.map(({ $el, isValid, value, touched, required }) => {
            if (touched === true && isValid === false) return { $input: $el, isError: true, message: "Validation failed" };
            else if (touched === true && required === true && !value) return { $input: $el, isError: true, message: "" };
            else if (touched === true && required === true && value) return { $input: $el, isError: false };
            else if (touched === true && isValid === true) return { $input: $el, isError: false };
            return null;
        }),
        rxjs.filter((validData) => !!validData),
        rxjs.tap(({ $input, isError, message }) => {
            if (isError) {
                $input.style.borderColor = "var(--error)";
                $input.nextSibling.style.color = "var(--error)";
                $input.nextSibling.textContent = message;
                return;
            }
            $input.style.borderColor = "";
            $input.nextSibling.style.color = "";
            $input.nextSibling.textContent = "";
        }),
        rxjs.filter(({ isError }) => !!isError),
    ));
};

function createForm$($node, inputNames) {
    const input$ = (name) => {
        const $el = $node.querySelector(`[name="${name}"]`);
        if (!$el) throw new Error("unknown: " + name);
        return rxjs.fromEvent($node.querySelector(`[name="${name}"]`), "input").pipe(
            rxjs.map((e) => ({ $el: e.target, touched: true })),
            rxjs.startWith({ $el, touched: false }),
            rxjs.map(({ $el, touched }) => ({
                $el, touched,
                name: $el.getAttribute("name"),
                value: $el.value,
                validation: $el.getAttribute("data-pattern"),
                required: $el.hasAttribute("data-required"),                
            })),
            rxjs.map((field) => {
                if (field.validation) {
                    field.isValid = new RegExp($el.getAttribute("data-pattern")).test($el.value);
                } else {
                    field.isValid = true;
                }
                return field;
            }),
        );
    };
    return rxjs.combineLatest(inputNames.map((sel) => input$(sel)));
}

function toJSON() {
    return rxjs.map((names) => names.reduce((acc, { name, value }) => {
        if (!name) return acc;
        acc[name] = value;
        return acc;
    }, {}))
}

const CSS = `
.component_form form label span { font-size: 0.8rem; }
.component_form pre { padding-top: 50px; }
.component_form form label { display: block; }
.component_form form input { margin-top: 3px; margin-bottom: 0; }
.component_form form input ~ div { height: 1rem; font-size: 0.8rem; opacity: 0.8; }
`;
