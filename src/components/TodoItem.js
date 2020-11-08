import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from "../context";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem',
    }
}

function TodoItem({todo, index, onChange}) {
    const {removeTodo} = useContext(Context);
    const classes = [];

    if (todo.completed) {
        classes.push('task-done')
    }

    return (
        <li style={styles.li}>
        <span className={classes.join(' ')}>
            <input
                type="checkbox"
                style={styles.input}
                checked={todo.completed}
                onChange={() => onChange(todo.id)}/>
            <strong>{index})</strong>
            &nbsp; {/* Пустое место (неразрывный пробел) */}
            {todo.title}
        </span>
            <button
                className="removeButton"
                onClick={removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}


export default TodoItem;