Here is the summary converted into a clean Markdown format:

---

# Fetching Data with Effects

The "Fetching data" section of React's documentation on **Synchronizing with Effects** outlines how to handle data fetching within a component's lifecycle and highlights common pitfalls to avoid.

## 1. Basics of Fetching in Effects

To fetch data in a React component, you typically call your API inside a `useEffect` hook. Since fetching is a "side effect" that interacts with an external system (the network), it should not happen during the pure rendering phase.

* **Trigger:** Use an empty dependency array `[]` if you only want to fetch when the component first appears (mounts).
* **Reactive Fetching:** If the data depends on a prop or state (like a user ID), include that variable in the dependency array so the Effect re-runs when the ID changes.

## 2. The Necessity of Cleanup (The "Race Condition")

The documentation emphasizes that every fetch inside an Effect needs a **cleanup function**. Without it, you encounter **race conditions**:

* **The Problem:** If you switch from "User A" to "User B" quickly, two requests are sent. If the response for User A arrives *after* the response for User B, the UI will incorrectly display User A's data even though User B is selected.
* **The Solution:** Use a "boolean flag" or an `AbortController` to ignore the results of a fetch if the component has re-rendered or unmounted before the request finished.

```javascript
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchResult(userId);
    if (!ignore) {
      setUserData(json);
    }
  }

  startFetching();

  return () => {
    ignore = true; // Cleanup: ignore the result if the component re-renders
  };
}, [userId]);

```

## 3. Why it Runs Twice in Development

React intentionally runs Effects **twice in development** (with Strict Mode on) to help you find bugs. If your fetching code doesn't have a cleanup function, you might notice two network requests. While one extra fetch in development is usually fine, the "twice-run" behavior is a reminder to ensure your logic is resilient to being stopped and restarted.

## 4. Recommended Alternatives

The guide notes that while fetching in `useEffect` is a common starting point, it has downsides (like "waterfalls" where nested components wait for parents to finish fetching). They recommend:

* **Frameworks:** Using built-in data-fetching features in frameworks like Next.js or Remix.
* **Client-side Caching:** Using libraries like **React Query**, **SWR**, or **Router loaders** which handle caching, deduplication, and race conditions automatically.
* **Avoiding "Effects for Everything":** If you can fetch data during a user event (like a button click), do it in the event handler instead of an Effect.

---

Would you like me to generate a more detailed code example using the `AbortController` method for cleaning up fetches?