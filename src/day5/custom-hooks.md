# Reusing Logic with Custom Hooks — Summary

## 🚀 What Are Custom Hooks

Custom Hooks are JavaScript functions that start with `use` and let you extract and reuse stateful logic between components. They work by combining React’s built-in hooks like `useState`, `useEffect`, etc. into reusable abstractions.

## 🔁 Why Use Custom Hooks

- Avoid duplicating logic in multiple components.
- Keep components focused on UI, not underlying behavior.
- Make code cleaner, easier to maintain, and more scalable.

## 🧠 Example: Sharing Network Status Logic

Without a custom Hook, two components (StatusBar and SaveButton) might both maintain their own online status logic:

```javascript
const [isOnline, setIsOnline] = useState(true);

useEffect(() => {
  const goOnline = () => setIsOnline(true);
  const goOffline = () => setIsOnline(false);
  window.addEventListener('online', goOnline);
  window.addEventListener('offline', goOffline);
  return () => {
    window.removeEventListener('online', goOnline);
    window.removeEventListener('offline', goOffline);
  };
}, []);
```

Extract into a custom Hook:

```javascript
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
}
```

Now components can reuse it:

```javascript
const isOnline = useOnlineStatus();
```

## 📌 Key Rules for Custom Hooks

- The name must start with `use`.
- They are functions that use other hooks internally.
- Custom Hooks share logic, not shared state — each component gets its own state.

## 🧩 How They Improve Code

- Encapsulate complex logic into reusable units.
- Reduce duplication and side-effect code in components.
- Make components easier to read and test.

## ⚙️ When to Extract a Custom Hook

If two or more components repeat the same logic, that logic is a candidate to be extracted into a custom Hook.