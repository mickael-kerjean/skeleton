export default async function(render) {
    render(`
        <div class="component_helloworld">
            <h1>
                Hello world
            </h1>
            <p>
                  (content coming in 2s)
             </p>
        </div>
   `);

    await new Promise((done) => setTimeout(done, 1000));

    render(`
        <div class="component_helloworld">
            <!-- this is all plain HTML -->
            <h1>
                Hello world
            </h1>
            <p>
                <a href="/example/" data-link>go home</a>
                <br/><br/>
                render things exactly when and how you want. After all, it's plain old javascript
             </p>
        </div>
   `);
};
