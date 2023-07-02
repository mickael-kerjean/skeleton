import { createElement, onDestroy } from "../../skeleton/index.js";

import "../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_styling2">
            <h1>
                <component-back></component-back>
                Styling 2/2
            </h1>

            <style>${CSS}</style>
            <style data-bind="dynamic-css"></style>

            <div class="box"></div>
        </div>
   `);
    render($page);

    const id = setInterval(() => {
        $page.querySelector(`[data-bind="dynamic-css"]`).textContent = generateCSS();
    }, 1000);
    onDestroy(() => clearInterval(id));
};

const generateCSS = () => {
    const randomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);
    const scaler = () => Math.floor((Math.random()*10))/10 + 0.7; // between 0.7 and 1.7
    return `
.component_styling2 .box {
   background: ${randomColor()};
   border: 20px solid ${randomColor()};
   transform: scale(${scaler()})
}`;
};


const CSS = `
.component_styling2 .box {
   height: 100px;
   width: 100px;
   margin: 50px auto;
   transition: 1s all linear;
   animation-name: rotate;
   animation-duration: 1s;
   animation-iteration-count: 50;
   animation-timing-function: linear;
}
@keyframes rotate {
  from { transform: rotate(0);}
  to { transform: rotate(360deg);}
}`;
