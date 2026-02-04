# Common Mistakes with React Testing Library

A consolidated, copy-paste-ready summary of **all key points** from Kent C. Dodds’ article  
**“Common Mistakes with React Testing Library”**

---

## 🧠 Importance Levels Used

- **Low** – Mostly opinionated, not critical
- **Medium** – Can cause bugs, confusion, or extra work
- **High** – Strongly discouraged, leads to fragile tests

---

## ❌ Mistakes & ✅ Recommended Practices

---

## 1. Not using Testing Library ESLint plugins *(Medium)*

### ❌ Mistake
Skipping linting support for tests.

### ✅ Better Practice

Install and use:
- `eslint-plugin-testing-library`
- `eslint-plugin-jest-dom`

These plugins automatically catch many common testing mistakes and enforce best practices.

---

## 2. Using `wrapper` as the variable name from `render` *(Low)*

### ❌ Mistake

```js
const wrapper = render(<Component />)
```

**Why:**
- wrapper is leftover terminology from Enzyme
- Encourages implementation-focused thinking

### ✅ Better Practice

```js
const { rerender } = render(<Component />)
```

or

```js
const view = render(<Component />)
```

---

## 3. Manually calling cleanup *(Medium)*

### ❌ Mistake

```js
afterEach(cleanup)
```

**Why:**
- Modern versions of React Testing Library auto-cleanup after each test
- Manual cleanup is unnecessary and noisy

### ✅ Better Practice

Let the test environment handle cleanup automatically.

---

### ❌ Mistake

```js
const { getByRole } = render(<Component />)
getByRole('button')
```

**Why:**
- Encourages destructuring queries repeatedly
- Less readable tests

### ✅ Better Practice

```js
render(<Component />)
screen.getByRole('button')
```

`screen` represents how a real user sees the UI.

---

### ❌ Mistake

```js
expect(button.disabled).toBe(true)
```

**Why:**
- Poor error messages
- Tied to implementation details

### ✅ Better Practice

```js
expect(button).toBeDisabled()
```

Use `@testing-library/jest-dom` matchers for clearer, more user-centric assertions.

---

## 6. Wrapping things in act unnecessarily *(Medium)*

### ❌ Mistake

```js
act(() => {
  render(<Component />)
})
```

**Why:**
- render, fireEvent, and userEvent already wrap updates in act
- Adds noise and confusion

### ✅ Better Practice

Only use act when absolutely required for non-standard async behavior.

---

## 7. Using the wrong queries *(High)*

## 7. Using the wrong queries *(High)*

### ❌ Common Mistakes

- Overusing getByTestId
- Using container.querySelector
- Querying by implementation details

### ✅ Better Practice

Follow query priority:

1. `getByRole`
2. `getByLabelText`
3. `getByText`
4. `getByPlaceholderText`
5. `getByTestId` (last resort)

This ensures tests reflect how users actually interact with the UI and improves accessibility.