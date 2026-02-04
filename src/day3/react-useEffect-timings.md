# useEffect vs useLayoutEffect – Paint Timing Explained (TSX)

This guide explains **when React runs Effects**, how that relates to the **browser paint cycle**, and **when you should use `useEffect` vs `useLayoutEffect`**. Examples are intentionally small and written in **TSX**.

---

## The core idea (one paragraph version)

* **`useEffect`** runs *after* React updates the DOM and usually **after the browser paints the screen**.
* **`useLayoutEffect`** runs *after* React updates the DOM but **before the browser paints**.

So:

* If your effect is **visual and timing matters** → `useLayoutEffect`
* If not → `useEffect` (default, preferred)

---

## 1. Effects NOT caused by user interaction

### What React does

If an effect is **not triggered by a click or other interaction**, React lets:

1. React update the DOM
2. Browser paint the screen
3. Then runs `useEffect`

### Example (possible flicker)

```tsx
useEffect(() => {
  tooltipRef.current!.style.top = "100px";
}, []);
```

If this effect repositions something visible (like a tooltip), users may see a **brief flicker**.

### ✅ Fix: useLayoutEffect for visual work

```tsx
useLayoutEffect(() => {
  tooltipRef.current!.style.top = "100px";
}, []);
```

**Why this works:**

* DOM updates
* layout effect runs
* browser paints once (no flicker)

---

## 2. Effects caused by user interaction (clicks, input, etc.)

### What React does

If an effect is triggered by an **interaction**, React may run the effect **before the browser paints**.

This ensures:

* The event system can observe the effect’s result
* Clicks and events behave consistently

### Example

```tsx
function Button() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      console.log("Modal opened");
    }
  }, [open]);

  return <button onClick={() => setOpen(true)}>Open</button>;
}
```

This usually works exactly as you expect.

---

## 3. Deferring work until AFTER paint (alerts, heavy work)

### Problem

Sometimes you **must wait until after the screen paints**, even if the effect was caused by a click.

Example: `alert()` blocks painting.

### ❌ Bad experience

```tsx
useEffect(() => {
  alert("Saved!"); // blocks paint
}, [saved]);
```

### ✅ Defer with setTimeout

```tsx
useEffect(() => {
  setTimeout(() => {
    alert("Saved!");
  }, 0);
}, [saved]);
```

**Why:**

* Browser paints first
* Alert runs after paint

---

## 4. State updates inside Effects and repainting

### Important nuance

Even if an effect is caused by an interaction, React **may allow the browser to repaint** before applying state updates inside `useEffect`.

Usually this is fine.

### But if you must block repainting

Use `useLayoutEffect`.

### Example

```tsx
useLayoutEffect(() => {
  setPosition(calculatePosition());
}, []);
```

This guarantees:

* No intermediate paint
* Layout stays visually consistent

---

## 5. Visual timeline comparison

### useEffect

```
React render
↓
DOM updated
↓
Browser paints 🎨
↓
useEffect runs
```

### useLayoutEffect

```
React render
↓
DOM updated
↓
useLayoutEffect runs
↓
Browser paints 🎨
```

---

## When to use what (rule of thumb)

### ✅ Use useEffect (90% of cases)

* Data fetching
* Logging
* Subscriptions
* Non-visual side effects

### ✅ Use useLayoutEffect (only when necessary)

* Measuring DOM size or position
* Positioning tooltips / popovers
* Preventing flicker
* Blocking paint for correctness

---

## Key takeaways

* `useEffect` runs **after paint** (usually)
* `useLayoutEffect` runs **before paint** (always)
* Visual side effects that flicker → `useLayoutEffect`
* Blocking operations → defer with `setTimeout`
* Prefer `useEffect` unless timing truly matters

---

This document is ideal as a **mental model reference**, **debugging aid**, or **interview explanation** for React effect timing.
