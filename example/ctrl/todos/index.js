import { createElement, onDestroy } from "../../../skeleton/index.js";
import rxjs, { withEffect } from "../../../skeleton/rxjs/index.js";
import { animate, CSSTransition } from "../../../skeleton/animate/index.js";

import { listTodo, filterTodo, persistOnQuit } from "./action.js"
import todoService from "./service.js";
import { useForm$ } from "../../helpers/form.js";

import "./components/todo.js";
import "../../components/back-button.js";

export default function(render) {
    const $page = createElement(`
        <div class="component_todopage">
            <style>${CSS}</style>
            <h1>
                <component-back></component-back>
                Todos
            </h1>
            <div>
                <form>
                    <input type="text" name="todo-label" placeholder="What needs to be done?"/>
                    <select name="todo-filter">
                         <option>All</option>
                         <option>Active</option>
                         <option>Completed</option>
                    </select>
                </form>
                <div data-bind="todos"></div>
            </div>
        </div>
    `);
    render($page);
    withEffect(animate($page).pipe(CSSTransition()));

    // filter change
    withEffect(useForm$($page, ["todo-filter"]).pipe(
        rxjs.map((jsonArr) => jsonArr[0]),
        rxjs.tap(({ value }) => todoService.filterBy(value)),
    ));

    // form submit: create a todo
    withEffect(rxjs.fromEvent($page.querySelector("form"), "submit").pipe(
        rxjs.tap((e) => e.preventDefault()),
        rxjs.switchMap(() => useForm$($page, ["todo-label"]).pipe(rxjs.take(1))),
        rxjs.map((jsonArr) => jsonArr[0]),
        rxjs.tap(({ value }) => todoService.put(value)),
        rxjs.tap(({ $el }) => $el.value = ""),
    ));

    // handle the display of todos
    const $todoTmpl = createElement(`<div is="todo-item" data-name="t" data-done="" data-time=""></div>`);
    withEffect(todoService.list().pipe(
        rxjs.mergeMap((todos) => todos),
        rxjs.tap((todo) => {
            let $todo = $page.querySelector("#"+todo.id);
            if (todo.visible === false) {
                if ($todo) $todo.remove();
                return;
            }
            if (!$todo) {
                $todo = $todoTmpl.cloneNode(true);             
                $todo.setAttribute("data-time", todo.creationTime);
                $todo.setAttribute("id", todo.id);
                $todo.setAttribute("data-name", todo.name);
                $todo.setAttribute("data-done", todo.done);
                $page.querySelector(`[data-bind="todos"]`).appendChild($todo);
            } else {
                if ($todo.getAttribute("data-name") != todo.name) $todo.setAttribute("data-name", todo.name);
                if ($todo.getAttribute("data-done") != todo.done) $todo.setAttribute("data-done", todo.done);
            }
        }),
    ));

    onDestroy(() => todoService.persist());
};

const CSS = `
.component_todopage form { display: flex; }
.component_todopage form input, .component_todopage form select { margin-bottom: 1rem; }
.component_todopage form input { padding: 10px; }
.component_todopage form select { max-width: 150px; }`;
