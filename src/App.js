import React, {useEffect} from 'react';
import TodoList from './components/TodoList';
import Context from "./context";
import Loader from "./components/Loader";

const AddTodo = React.lazy(() => import('./components/AddTodo'))

function App() {

    // Возвращает:
    // Начальное значение + функция для изменения state
    const [todos, setTodos] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(response_todos => {
                setTimeout(() => {
                    setTodos(response_todos);
                    setLoading(false);
                }, 2000);
            })
    }, []);

    function toggleTodo(id) {
        setTodos(todos.map(
            todo_elem => {
                if (todo_elem.id === id) {
                    todo_elem.completed = !todo_elem.completed
                }
                return todo_elem;
            })
        )
    }

    function removeTodo(id) {
        // eslint-disable-next-line no-lone-blocks
        {/* Фильтация: оставляет только те элементы,
        которые подходят под условие функции (возвращают True).
        Условие !== возвращает False, если ID совпадают.*/
        }
        setTodos(todos.filter(
            todo => todo.id !== id
        ));
    }

    function addTodo(title) {
        /* Скобки: [] - создаём массив из 1 элемента - объекта {} с полями id и т.д. */
        setTodos(todos.concat([{
            id: Date.now(),
            completed: false,
            title: title
        }]));
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="wrapper">
                <h1>ToDo List:</h1>
                <React.Suspense fallback={<p>Loading...</p>}>
                    <AddTodo onCreate={addTodo}/>
                </React.Suspense>

                {loading ? <Loader/> : null}
                {todos.length ?
                    <TodoList todos={todos} onToggle={toggleTodo}/> :
                    loading ? null : <p>No todos!</p>
                }
            </div>
        </Context.Provider>
    );
}

export default App;
