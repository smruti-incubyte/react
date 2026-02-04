# Testing Asynchronous Code in Jest

When testing asynchronous JavaScript with Jest, you need to tell Jest when an async operation has finished so it can wait before ending the test. Jest provides several ways to handle this.

## 1. Promises

If your function returns a Promise, Jest will wait for it to resolve. If the promise rejects, the test will fail.

```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

## 2. Async/Await

Use async and await to write async tests in a synchronous style. Jest automatically waits for the awaited promise.

```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```

You can also test promise rejections using `.resolves` and `.rejects`:

```javascript
await expect(fetchData()).resolves.toBe('peanut butter');
await expect(fetchData()).rejects.toMatch('error');
```

## 3. Callbacks (using done)

For callback-based async code, pass a done parameter to the test and call it after your assertions. Jest waits until done() is called.

```javascript
test('the data is peanut butter', done => {
  function callback(error, data) {
    expect(data).toBe('peanut butter');
    done();
  }
  fetchData(callback);
});
```

If `done()` isn't called (or an assertion fails), Jest flags the test as failed.

## Important Notes

- Always return a promise or await it — otherwise Jest won't wait and the test may end too soon.
- Don't mix `done` and promises in the same test (Jest will throw an error).
