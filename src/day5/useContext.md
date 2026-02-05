# useContext Hook

## 1. What is useContext and Why It's Needed

### Concept
`useContext` is a React Hook that lets you read and subscribe to context values without passing props through every level of your component tree. It solves the **prop drilling** problem.

### The Problem: Prop Drilling
```
App (user data)
 ├─ Layout
 │  ├─ Header
 │  │  └─ UserProfile (needs user data)
 │  └─ Sidebar
 │     └─ UserMenu (needs user data)
```

Without context, you'd pass `user` props through Layout and Header to reach UserProfile, even if they don't use it.

### The Solution: Context
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### When to Use Context
- **User authentication data** (current user, permissions)
- **Theme settings** (dark/light mode)
- **Language/localization** preferences
- **Global UI state** (modals, notifications)
- **App configuration** data

---

## 2. API Reference

### Step 1: Create a Context
```javascript
const MyContext = React.createContext(defaultValue);
```
- `defaultValue`: Used when no Provider wraps the component (optional)

### Step 2: Provide Context
```javascript
<MyContext.Provider value={data}>
  <Child />
</MyContext.Provider>
```
- Wraps components that need access to the context
- `value` prop provides the data to consumers

### Step 3: Consume Context with useContext
```javascript
const value = useContext(MyContext);
```
- Returns the current context value
- Only works in functional components
- Re-renders when context value changes

---

## 3. Code Examples

### Example 1: Theme Context

```javascript
import React, { createContext, useContext, useState } from 'react';

// Step 1: Create context
const ThemeContext = createContext();

// Step 2: Create Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Custom hook to use context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
```

### Example 2: Using Theme Context

```javascript
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useTheme();

  return (
    <div style={{ 
      background: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <p>Content adapts to {theme} theme</p>
    </div>
  );
}
```

---

## Key Takeaways

✅ Use `useContext` to avoid prop drilling  
✅ Create a custom hook for cleaner code  
✅ Add error checking in custom hooks  
✅ Context causes re-renders when value changes  
⚠️ Don't use for frequently changing data (use Redux/Zustand instead)  
