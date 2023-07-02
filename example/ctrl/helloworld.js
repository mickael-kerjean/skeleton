export default function(render) {
    render(`
        <div class="component_helloworld">
            <!-- this is all plain HTML -->
            <h1>
                Hello World
            </h1>
            <p>
                <a href="/example/helloworld2" data-link>next</a>
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
             </p>
        </div>
   `);
};
