## Rules for `useState`

### Where You Can Call It
- Call `useState` **only at the top level** of a component or custom Hook.
- **Not inside loops, conditions, or nested functions**.
- If needed, extract a new component and move state there.

---

### Updating State
- Passing a function to `setState` makes it an **updater function**.
- It must be **pure**, receive the previous state, and return the next state.
- React queues updater functions and applies them on the next render.

---

### When State Changes Take Effect
- `setState` updates state **for the next render only**.
- Reading state immediately after `setState` gives the **old value**.

---

### Re-renders & Optimizations
- If the new state is `Object.is`-equal to the current state, React **skips re-rendering**.
- React **batches state updates** and re-renders after event handlers finish.
- To force an immediate update (rare), use `flushSync`.

---

### Effects & Dependencies
- The `setState` function has a **stable identity**.
- It’s safe to omit it from `useEffect` dependencies if the linter allows.

---

### Setting State During Render
- Allowed **only in the currently rendering component**.
- React discards the output and re-renders immediately.
- Rarely needed; useful for tracking data from previous renders.

---

### Strict Mode Behavior
- In development, React may call updater functions **twice** to detect impurities.
- This does **not affect production**.
- Pure updater functions behave correctly; one result is ignored.
