const _navigator$ = new rxjs.Subject();

export function init($root) {
    initLinkClick($root);
    return rxjs.merge(
        rxjs.fromEvent(window, "DOMContentLoaded"),
        rxjs.fromEvent(window, "popstate"),
        _navigator$.asObservable(),
    );
}

export function navigate(href) {
    history.pushState("", "", href)
    _navigator$.next(href);
}

export function currentRoute(r) {
    let sel = null;
    for (const prefix in r) {
        if (location.pathname.startsWith(prefix)) {
            sel = prefix;
            break;
        }
    }
    return r[sel] || r["/"];
}

function initLinkClick($root) {
    const _getHref = ($node) => {
        if (!$node.matches("[data-link]")) {
            if (!$node.parentElement) return null;
            return _getHref($node.parentElement);
        }
        return $node.getAttribute("href");
    };
    rxjs.fromEvent($root, "click").pipe(
        rxjs.map((e) => {
            const href = _getHref(e.target)
            href && e.preventDefault();
            return href;
        }),
        rxjs.filter((href) => href),
    ).subscribe(navigate);
}
