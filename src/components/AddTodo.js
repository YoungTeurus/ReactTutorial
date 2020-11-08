import React, {useState} from "react";
import PropTypes from 'prop-types';

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    return {
        bind: {
            value, /*  Равносильно value: value */
            /* Функция, принимающая event и устанавливающая value = значению value target-а event-а. */
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value,
    }
}

function AddTodo({onCreate}) {
    const input = useInputValue('');

    function submitHandler(event) {
        event.preventDefault(); /* Предотвращаем обновление страницы (стандартное действие submit). */

        if (input.value().trim()) {
            onCreate(input.value());
            input.clear();
        }
    }

    return (
        <form className="form-addTodo" onSubmit={submitHandler}>
            {/*<input value={value} onChange={event => setValue(event.target.value)}/>
            '...' - оператор расширения, развернёт input в value и onChange.*/}
            <input {...input.bind}/>
            <button type="submit">Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;