import { createElement } from "../../skeleton/index.js";
import rxjs, { withEffect } from "../../skeleton/rxjs/index.js";
import { animate, CSSTransition, slideYIn, slideYOut } from "../../skeleton/animate/index.js";

import "../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_transition2">
            <h1>
                <component-back></component-back>
                Transition 2/2
            </h1>
            <p>
                <div class="box"></div>
                <style>${CSS}</style>
            </p>
        </div>
   `);
    render($page);

    const animCfg = {
        timeoutEnter: 1000,
        timeoutLeave: 500
    };
    const cssCfg = {
        enter: slideYIn(-50), // this is how the css related to the animation is being generated
                              // there's a bunch of function defined in the animation.js
        leave: slideYOut(40), // slide on the y axis by 40px
    };
    withEffect(animate($page, animCfg).pipe(CSSTransition(cssCfg)));




    // animate the box a little bit
    withEffect(rxjs.timer(5000).pipe(
        rxjs.mapTo($page.querySelector(".box")),
        rxjs.filter((couldBeNull) => !!couldBeNull),
        rxjs.tap(($button) => $button.animate([
            {transform: "scale(1)"},
            {transform: "scale(1.5)"},
            {transform: "scale(0.2)"},
            {transform: "scale(1)"},
        ], {duration: 2000})),
    ));
};

const CSS = `
.component_transition2 .box {
     width: 100%;
     height: 200px;
     animation-duration: 0.5s;
     animation-name: animate-fade;
     animation-delay: 0.3s;
     animation-fill-mode: backwards;
     background: #333;
     border-radius: 3px;
}
@keyframes animate-fade {
  0% { opacity: 0; transform: scale(1.5); }
  100% { opacity: 1; transform: scale(1); }
}
`
