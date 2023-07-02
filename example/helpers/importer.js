import { createElement } from "../../skeleton/index.js";

export async function importJS(url, type = "") {
    if (document.head.querySelector(`[src="${url}"]`)) return;
    
    let $script = document.createElement("script");
    $script.setAttribute("src", url);
    if (type) $script.setAttribute("type", "module");
    document.head.appendChild($script);
    await new Promise((done, err) => {
        $script.addEventListener("load", done);
        $script.addEventListener("error", err);
    });
}

export async function importCSS(url) {
    if (document.head.querySelector(`[href="${url}"]`)) return;
    let $style = createElement(`<link rel="stylesheet" href="${url}" />`);
    document.head.appendChild($style);    
}
