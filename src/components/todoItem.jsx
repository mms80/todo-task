import {GoTrash} from "react-icons/go";

const TodoItem = (props) => {
    return (
        <li className="flex justify-between min-h-12 p-5 items-center border-[1px solid #eee]">
            <div>
                <input className="cursor-pointer" checked={props.todo.checked ? 'checked' : false} onChange={(e)=>props.checkTodo(props.todo.id)} type="checkbox"/>
                <span className="mx-2">{props.todo.title}</span>
            </div>
            <div className="cursor-pointer px-2" onClick={()=>props.deleteTodo(props.todo.id)}>
                <GoTrash className="font-light"/>
            </div>
        </li>
    )
}

export default TodoItem;