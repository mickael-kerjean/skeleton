const triggerPageChange = () => window.dispatchEvent(new Event("pagechange"));

export function init($root) {
    window.addEventListener("DOMContentLoaded", triggerPageChange);
    window.addEventListener("popstate", triggerPageChange);
    $root.addEventListener("click", (e) => {
        const href = _getHref(e.target, $root);
        return href ? e.preventDefault() || navigate(href) : null;
    });
}

export function navigate(href) {
    history.pushState("", "", href);
    triggerPageChange();
}

export function currentRoute(r, defaultRoute) {
    for (const prefix in r) {
        if (location.pathname.startsWith(prefix)) {
            return r[prefix];
        }
    }
    return r[defaultRoute];
}

function _getHref ($node, $root) {
    if ($node.matches("[data-link]")) return $node.getAttribute("href");
    if ($node.isSameNode($root)) return null;
    if (!$node.parentElement) return null;
    return _getHref($node.parentElement, $root);
}
