"use client"
import {useState, useEffect} from "react";
import TodoItem from "@/components/todoItem";
import useDebounce from "@/hooks/useDebounce";

const Todo = (props) => {

    const [todos, setTodos] = useState(() => {
        const todoList = localStorage.getItem("todos");
        const todoListArray = JSON.parse(todoList);
        return todoListArray || [];
    });

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const [filteredTodos, setFilteredTodos] = useState(todos);

    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        setLoading(true)
        setFilteredTodos([])
        setSearch(e.target.value)
    }

    useEffect(() => {

        let timeOut;

        let searchPromise = new Promise((resolve, reject) => {
            timeOut = setTimeout(() => {
                resolve()
            }, 1000)
        })

        searchPromise.then(() => {
            setLoading(false)
            setFilteredTodos(todos.filter((todo) => todo.title.indexOf(search) > -1))
        })

        return ()=>{
            clearTimeout(timeOut)
        }

    }, [debouncedSearch,todos])

    const [todoItem, setTodoItem] = useState("");

    const [lastId, setLastId] = useState(() => {
        const id = localStorage.getItem("lastId")
        return Number(id) || 0;
    });

    const insertTodo = () => {
        if (todoItem) {
            let t = [...todos]
            t.push({
                id: lastId + 1,
                title: todoItem,
                checked: false
            })
            setLastId(lastId + 1)
            setTodos(t)
            setFilteredTodos(t)
            setTodoItem("")
            setSearch("")
            localStorage.setItem("lastId", lastId + 1)
            localStorage.setItem("todos", JSON.stringify(t))
        } else {
            alert("please insert your task!")
        }
    }

    const deleteTodo = (id) => {
        let t = [...todos]
        let index = t.findIndex((i) => i.id === id)
        if (index > -1) {
            t.splice(index, 1)
            setTodos(t)
            localStorage.setItem("todos", JSON.stringify(t))
        }
    }

    const handleCheckTodo = (id) => {
        let t = [...todos]
        let index = t.findIndex((i) => i.id === id)
        if (index > -1) {
            t[index].checked = !t[index].checked
            setTodos(t)
            localStorage.setItem("todos", JSON.stringify(t))
        }
    }

    return (
        <>
            <section className="bg-white h-12 flex items-center justify-between px-4 py-7 my-5 rounded-md">
                <input type="text" value={todoItem} onChange={(e) => {
                    setTodoItem(e.target.value)
                }} placeholder={"Insert Your Task..."} className="outline-0 w-full"/>
                <button className="px-2 py-1 rounded-md bg-blue-500 text-white" onClick={() => insertTodo()}>Add
                </button>
            </section>

            <section className="bg-white rounded-md overflow-hidden">
                <input className="w-full h-11 outline-0 p-5 mb-2 border-b-[1px] border-b-zinc-100" type="text"
                       placeholder={"search..."} onChange={(e) => handleSearch(e)}/>
                {loading ? <p className="text-zinc-400 text-center p-3">loading...</p> : ''}
                {!filteredTodos.length && !loading ? <p className="text-zinc-400 text-center p-3">not found.</p> : ''}
                <ul>
                    {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo}
                                                         checkTodo={handleCheckTodo}/>)}
                </ul>
            </section>
        </>
    )
}

export default Todo;