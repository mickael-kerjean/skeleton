import { createElement } from "../../../skeleton/index.js";
import rxjs from "../../../skeleton/rxjs/index.js";
import svc from "./service.js";

export function listTodo($container) {
    let $todoTmpl = createElement(`<div is="todo-item" data-name="t" data-done="" data-time=""></div>`);
    const createTodoNode = (todo) => {
        const $todo = $todoTmpl.cloneNode(true);
        $todo.setAttribute("data-name", todo.name);
        $todo.setAttribute("data-done", todo.done);
        $todo.setAttribute("data-time", todo.creationTime);
        $todo.setAttribute("id", todo.id);
        return $todo;
    };
    const mutateTodoNode = ($todo, todo) => {
        // TODO
    };

    return svc.list().pipe(rxjs.tap((todos) => {
        todos.forEach((todo) => {
            const $previous = $container.querySelector("#"+todo.id);
            if ($previous === null) $container.appendChild(createTodoNode(todo));
            else mutateTodoNode($previous, todo);
        });
    }))
}

export function filterTodo($app) {
    return rxjs.fromEvent($app.querySelector("select", "change")).pipe(
        rxjs.map(() => "ALL"),
        rxjs.tap((val) => svc.filter(val)),
    );
}

export function persistOnQuit() {
    return svc.persist()
}
