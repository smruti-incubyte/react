# React State Usage Patterns (with TSX examples)

This guide explains **how to correctly use React state**, why each pattern exists, and when to use it. All examples are written in **TSX** and kept intentionally small.

---

## 1. Adding state to a component

### When to use

Use state when data:

* Changes over time
* Affects what is rendered
* Belongs to a specific component

### Example

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Rule:** State lives where it is used.

---

## 2. Updating state based on the previous state

### Why this matters

State updates may be **batched**, so reading `count` directly can be unsafe when multiple updates happen.

### ❌ Unsafe update

```tsx
setCount(count + 1);
```

### ✅ Correct approach (functional update)

```tsx
setCount(prev => prev + 1);
```

### Example

```tsx
function incrementTwice() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

### Complete Example with Unsafe and Safe Patterns

```tsx
const unsafeIncrement = () => {
  // ❌ React batches these updates
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

const safeIncrement = () => {
  // ✅ Each update receives the latest value
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

**Rule:** If the new state depends on the old state, always use a function.

---

## 3. Updating objects and arrays in state

### Why this matters

React compares state by **reference**, not by mutation.

### ❌ Mutating an object

```tsx
const [user, setUser] = useState({ name: "Alex", age: 25 });

user.age = 26;
setUser(user);
```

### ✅ Correct object update

```tsx
setUser({
  ...user,
  age: 26,
});
```

### ❌ Mutating an array

```tsx
items.push("apple");
setItems(items);
```

### ✅ Correct array update

```tsx
setItems([...items, "apple"]);
```

**Rule:** Always create a new object or array.

---

## 4. Avoiding recreating the initial state

### Why this matters

Expensive initialization logic will run **on every render** if written incorrectly.

### ❌ Recomputed on every render

```tsx
const [data, setData] = useState(expensiveCalculation());
```

### ✅ Lazy initialization

```tsx
const [data, setData] = useState(expensiveCalculation);
```

### Example

```tsx
function expensiveCalculation() {
  console.log("running expensive calculation");
  return 42;
}
```

**Rule:** Pass a function to `useState` for expensive initial values.

---

## 5. Resetting state with a key

### When to use

Use this when you want to **completely reset a component’s state**, not just update part of it.

### Example

```tsx
function FormWrapper() {
  const [version, setVersion] = useState(0);

  return (
    <>
      <Form key={version} />
      <button onClick={() => setVersion(v => v + 1)}>
        Reset Form
      </button>
    </>
  );
}
```

```tsx
function Form() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

**Why it works:** Changing the `key` forces React to remount the component.

---

## 6. Storing information from previous renders

### Why this matters

Sometimes you need a value that:

* Persists across renders
* Does NOT trigger a re-render

### Solution: `useRef`

### Example

```tsx
import { useEffect, useRef, useState } from "react";

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCount = useRef<number | null>(null);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

**Rule:** Use `useRef` for mutable values that should not cause re-renders.

---

## Key Takeaways

* Use `useState` for reactive UI data
* Use functional updates when state depends on previous state
* Never mutate objects or arrays in state
* Lazily initialize expensive state
* Use `key` to reset component state
* Use `useRef` to store values across renders without re-rendering

---

This document works well as a **learning guide**, **debugging reference**, or **interview revision sheet**.
