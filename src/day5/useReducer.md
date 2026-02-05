# useReducer Hook

## useState vs useReducer

| Aspect | useState | useReducer |
|--------|----------|-----------|
| **Best for** | Simple state (strings, numbers, booleans) | Complex state with multiple related values |
| **State updates** | Direct value updates | Dispatches actions to a reducer function |
| **Logic** | Spread across components | Centralized in reducer function |
| **Performance** | Good for simple cases | Better for deeply nested updates |
| **Testing** | Tests component logic | Tests pure reducer function separately |

## How to Create useReducer

**Syntax:**
```javascript
const [state, dispatch] = useReducer(reducerFunction, initialState);
```

**Steps:**
1. Define a reducer function: `(state, action) => newState`
2. Initialize with `useReducer(reducer, initialState)`
3. Dispatch actions: `dispatch({ type: 'ACTION_NAME', payload: value })`

## Code Examples

### Basic Counter
```javascript
function counterReducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### Complex State (Todo App)
```javascript
function todoReducer(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          <span>{todo.text}</span>
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>Delete</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: 'New task' })}>Add</button>
    </div>
  );
}
```

## Extra Tips

- **Optimize Performance**: Pass `dispatch` to child components via context to avoid prop drilling
- **Combine with useCallback**: Memoize dispatch callbacks for child components
- **Combine with useContext**: Create a store pattern for global state management
- **Lazy Initialization**: Use a third parameter for complex initial state:
  ```javascript
  const [state, dispatch] = useReducer(reducer, initialArg, init);
  // init function runs once during mount
  ```
- **Action Creators**: Wrap dispatch calls in helper functions for cleaner code

