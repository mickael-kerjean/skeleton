import "../components/back-button.js";

export default function(render) {
    const size = [800, 400];
    const color = "333";
    const alt = "just a placeholder"
    
    render(`
        <div class="component_attribute">
            <h1>
                <component-back></component-back> Dynamic Attribute
            </h1>

            <img
                alt="${alt}"
                src="https://placehold.co/${size[0]}x${size[1]}/${color}/ccc"
                style="width:100%" />
        </div>
   `);
};
