import { useState } from 'react';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Todo List</h1>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={addTodo}
                    style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
                >
                    Add
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            padding: '10px',
                            marginBottom: '8px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#999' : '#000',
                                }}
                            >
                                {todo.text}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}