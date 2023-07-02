import rxjs from "../../../skeleton/rxjs/index.js";

class TodoSvc {
    todos;
    filter;

    constructor() {
        this.todos = new rxjs.BehaviorSubject(JSON.parse(localStorage.getItem("todos")) || []);
    }

    list() {
        return this.todos.asObservable();
    }

    put(label) {
        const t = {
            name: label,
            creationTime: new Date().toJSON(),
            done: false,
            show: true,
            visible: this.filter !== 2,
        };
        t["id"] = this._generateID(t);        
        this.todos.next([t, ...this.todos.value])
    }

    filterBy(criteria) {
        switch(criteria) {
        case "Active":
            this.filter = 1;
            this.todos.next(this.todos.value.map((todo) => {
                todo.visible = !todo.done;
                return todo;
            }));
            break;
        case "Completed":
            this.filter = 2;
            this.todos.next(this.todos.value.map((todo) => {
                todo.visible = !!todo.done;
                return todo;
            }));
            break;
        default:
            this.filter = 0;
            this.todos.next(this.todos.value.map((todo) => {
                todo.visible = true;
                return todo;
            }));
            break;
        }
    }

    done(id) {
        this.todos.next(this.todos.value.map((todo) => {
            if (todo.id !== id) return todo;
            todo.done = true;
            if (this.filter === 1) todo.visible = false;
            else todo.visible = true;
            return todo;
        }));
    }

    _generateID(todo) {
        // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
        const cyrb53 = (str, seed = 0) => {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for(let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
            h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
            h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            
            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        };
        return "todo_" + cyrb53(todo.name + todo.creationTime);
    }

    persist() {
        localStorage.setItem("todos", JSON.stringify(this.todos.value));
    }
}

export default new TodoSvc();
