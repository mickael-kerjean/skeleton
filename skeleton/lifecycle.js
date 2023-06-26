let _cleanup = [];

export function init($root) {
    $root.cleanup = () => {
        const fns = _cleanup.map((fn) => fn($root));
        _cleanup = [];
        return Promise.all(fns);
    };
}

export async function destructor(fn) {
    _cleanup.push(fn);
}
