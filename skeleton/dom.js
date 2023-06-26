export function createElement(str) {
    const $n = document.createElement("div");
    $n.innerHTML = str;
    return $n.children.length === 0 ? $n : $n.children[0];
}
