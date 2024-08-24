import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Importing the CSS file

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    };

    const addTodo = async () => {
        if (newTodo) {
            await axios.post('http://localhost:8080/api/todos', { title: newTodo, completed: false });
            setNewTodo("");
            fetchTodos();
        }
    };

    const toggleCompletion = async (id, completed) => {
        await axios.put(`http://localhost:8080/api/todos/${id}`, { completed: !completed });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8080/api/todos/${id}`);
        fetchTodos();
    };

    return (
        <div className="app-container">
            <h1 className="title">Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <span
                            className={todo.completed ? 'completed' : ''}
                            onClick={() => toggleCompletion(todo.id, todo.completed)}
                        >
                            {todo.title}
                        </span>
                        <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
