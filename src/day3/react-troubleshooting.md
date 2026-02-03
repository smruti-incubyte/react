# React State Troubleshooting (with TSX examples)

This guide covers common React state issues, **why they happen**, and **how to fix them**, with small and clear **TSX examples**.

---

## 1. I’ve updated the state, but logging gives me the old value

### Why this happens

State updates in React are **asynchronous**. Calling `setState` schedules a re-render; it does **not** update the value immediately.

### ❌ Incorrect example

```tsx
const [count, setCount] = useState<number>(0);

function handleClick() {
  setCount(count + 1);
  console.log(count); // still old value
}
```

### ✅ Correct way (observe after render)

```tsx
const [count, setCount] = useState<number>(0);

useEffect(() => {
  console.log(count); // updated value
}, [count]);

function handleClick() {
  setCount(count + 1);
}
```

**Mental model:** `setState` requests a re-render; the value updates on the next render.

---

## 2. I’ve updated the state, but the screen doesn’t update

### Why this happens

React re-renders only when the **state reference changes**. Mutating arrays or objects keeps the same reference.

### ❌ Mutating state

```tsx
const [items, setItems] = useState<number[]>([]);

function addItem() {
  items.push(1);       // mutation
  setItems(items);     // same reference
}
```

### ✅ Correct approach (immutable update)

```tsx
function addItem() {
  setItems([...items, 1]); // new array reference
}
```

**Rule:** Never mutate state directly. Always create a new object or array.

---

## 3. Error: “Too many re-renders”

### Why this happens

You are updating state **during render**, causing an infinite render loop.

### ❌ Incorrect example

```tsx
const [count, setCount] = useState<number>(0);

setCount(count + 1); // runs on every render
```

### ✅ Fix: update state in events or effects

```tsx
function handleClick() {
  setCount(count + 1);
}
```

or

```tsx
useEffect(() => {
  setCount(1);
}, []); // runs once
```

**Rule:** Rendering must be pure — no state updates inside render.

---

## 4. My initializer or updater function runs twice

### Why this happens

In **React Strict Mode (development only)**, React intentionally runs certain functions twice to detect side effects.

### Example

```tsx
const [count] = useState<number>(() => {
  console.log("initializer runs");
  return 0;
});
```

You may see the log twice in development.

### Important notes

* This does **not** happen in production
* Your code should be **idempotent** (safe to run multiple times)

**Takeaway:** React is testing your code, not breaking it.

---

## 5. I’m trying to set state to a function, but it gets called instead

### Why this happens

If you pass a function to `setState`, React assumes it is an **updater function**.

### ❌ Incorrect example

```tsx
const [callback, setCallback] = useState<() => void>(() => () => {});

function myFn() {
  console.log("hello");
}

setCallback(myFn); // React calls it immediately
```

### ✅ Correct way (wrap the function)

```tsx
setCallback(() => myFn); // function is stored, not executed
```

### Explanation

* `setState(fn)` → React calls `fn(prevState)`
* `setState(() => fn)` → React stores `fn`

**Rule:** To store a function in state, wrap it in another function.

---

## Key Takeaways

* State updates trigger re-renders; they do not mutate values immediately
* React compares state by **reference**, not by mutation
* Never update state during render
* Strict Mode double-invocation happens only in development
* Functions passed to `setState` are treated as updaters

---

This document can be used as a **debugging checklist**, **learning reference**, or **interview prep guide**.
