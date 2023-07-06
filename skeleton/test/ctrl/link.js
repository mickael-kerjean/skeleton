export default function(render) {
    render(`
<div>
    <h1>hello world</h1>
    <div>
        <a href="/something" data-link id="spa-link">SPA Link</a>
        <a href="/something" id="non-spa-link">Non SPA Link</a>   
    </div>
</div>
`);
};
