new Vue({
    el: "#app",
    data: {
        aaa: JSON.parse(localStorage.todos ? localStorage.todos : '[]').length,
        todos: JSON.parse(localStorage.todos ? localStorage.todos : '[]'),
        showType: 'all',
        types: [
            { type: 'all', content: 'A' },
            { type: 'finish', content: 'F' },
            { type: 'unfinish', content: 'U' }
        ],
        isInsertShow: false,
        isModifyShow: false,
        newtodo: '',
        isSelect: false,
        isSelected: false,
        currentId: 0
    },
    methods: {
        addNewTodo: function() {
            this.aaa++;
            this.todos.push({
                id: this.aaa,
                content: this.newtodo,
                isFinished: false,
            })
            this.isInsertShow = false;
            this.updateStorage()
        },
        modify: function(id) {
            this.isModifyShow = true
            this.currentId = id
            this.todos.forEach((todo) => {
                if (todo.id == id) {
                    this.newtodo = todo.content
                }
            })
        },
        isModify: function() {
            this.todos.forEach((item) => {
                if (item.id == this.currentId) {
                    item.content = this.newtodo
                }
            })
            this.updateStorage()
            this.isModifyShow = false
        },
        finish: function(id) { //完成一个todo
            this.todos.forEach((todo) => {
                if (todo.id == id) {
                    todo.isFinished = !todo.isFinished
                }
            })
            this.updateStorage()
        },
        remove: function(id) { //删除一个todo
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == id) {
                    this.todos.splice(i, 1)
                }
            }
            this.updateStorage()
        },
        updateStorage(id) {
            var arr = []
            this.todos.forEach((item, i) => {
                item.id = i + 1
                arr.push(item.todos)
            })
            localStorage.todos = JSON.stringify(this.todos)
            this.newtodo = ''
        },
        controlSelected(type) {
            if (type == 3) {
                var arr = []
                this.todos.forEach((todo) => {
                    if (!todo.isSelected) {
                        arr.push(todo)
                    }
                })
                this.todos = arr
                this.updateStorage()
            }
            this.todos.forEach((todo) => {
                if (todo.isSelected) {
                    todo.isFinished = type == 1 ? true : false
                }
            })
            this.updateStorage()
        }
    },
    computed: {
        finishTodos: function() { //根据所有的todos生成一个新数据，这个数据里全部都是完成的todo
            var arr = []
            this.todos.forEach((todo) => {
                if (todo.isFinished) {
                    arr.push(todo)
                }
            });
            return arr
        },
        unfinishTodos: function() {
            var arr = []
            this.todos.forEach((todo) => {
                if (!todo.isFinished) {
                    arr.push(todo)
                }
            });
            return arr
        },
        showTodos: function() {
            switch (this.showType) {
                case 'all':
                    return this.todos;
                    break;
                case 'finish':
                    return this.finishTodos;
                    break;
                case 'unfinish':
                    return this.unfinishTodos;
                    break;
                default:
                    return this.todos;
                    break;
            }
        }
    },
    watch: {
        isSelect: function(val) {
            if (val) {
                this.todos.forEach((todo) => {
                    todo.isSelected = false
                })
            }
        }
    }
})