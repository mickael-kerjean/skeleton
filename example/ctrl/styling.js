import "../components/back-button.js";

export default function(render) {
    render(`
        <div class="component_styling">
            <h1>
                <component-back></component-back>
                Styling 1/2
            </h1>
            <div class="box"></div>

            <!-- want to inject CSS? No problem -->
            <style>${CSS}</style>

            <a class="button" href="./styling2" data-link>Dynamic CSS</a>
        </div>
   `);
};

const CSS = `
.component_styling .box {
   height: 100px;
   width: 100px;
   animation-name: rotate;
   animation-duration: 2s;
   animation-delay: 150ms;
   margin: 50px auto;
}
@keyframes rotate {
  from { transform: rotate(0);}
  to { transform: rotate(360deg);}
}`;
