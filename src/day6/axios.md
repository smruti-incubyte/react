## What is Axios?

**Axios** is a promise-based HTTP Client for **node.js** and the browser. It is **isomorphic**, meaning it can run in the browser and node.js with the same codebase.

* **On the server-side:** It uses the native node.js `http` module.
* **On the client-side:** It uses `XMLHttpRequest`.

---

## Key Features

### Request Handling

* **Browser & Node support:** Make `XMLHttpRequest` from the browser or `http` requests from node.js.
* **Promise API:** Full support for the `Promise` API (async/await compatible).
* **Interceptors:** Intercept requests and responses before they are handled by `then` or `catch`.
* **Transformation:** Automatically transform request and response data.

### Functionality & Performance

* **Request Cancellation:** Ability to cancel requests using `CancelToken` or `AbortController`.
* **Timeouts:** Set specific timeout periods for requests.
* **Serialization:** * Query parameters serialization with support for nested entries.
* Automatic request body serialization to **JSON**, **Multipart/FormData**, and **URL encoded forms**.


* **Progress Capturing:** Track upload/download progress for browsers and node.js, including speed rate and remaining time.
* **Bandwidth Limits:** Support for setting bandwidth limits in node.js environments.

### Security & Compatibility

* **Data Handling:** Automatic JSON data handling in responses.
* **XSRF Protection:** Client-side support for protecting against Cross-Site Request Forgery.
* **Modern Standards:** Compatible with spec-compliant `FormData` and `Blob` (including node.js).

---