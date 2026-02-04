# Jest Matchers API Summary

This document summarizes all major Jest matchers from the official **Jest “Using Matchers”** and **Expect API** documentation. Matchers are functions used in Jest assertions via `expect(value)` to verify conditions in tests. :contentReference[oaicite:1]{index=1}

---

## 📌 1. Basic Matchers

Basic matchers are used to compare simple values:

| Matcher | Purpose |
|--------|---------|
| `toBe(value)` | Strict equality (`Object.is`) |
| `toEqual(value)` | Deep equality for objects/arrays |
| `toStrictEqual(value)` | Strict deep equality (includes types & undefineds) |
| `not` modifier | Negates any matcher |

Examples:

```js
expect(2 + 2).toBe(4);
expect(obj).toEqual({ a: 1 });
expect(value).not.toBeNull();
``` :contentReference[oaicite:2]{index=2}

---

## 🎯 2. Truthiness Matchers

| Matcher | Purpose |
|--------|---------|
| `toBeNull()` | Only matches `null` |
| `toBeUndefined()` | Only matches `undefined` |
| `toBeDefined()` | Opposite of `toBeUndefined()` |
| `toBeTruthy()` | Truthy in boolean context |
| `toBeFalsy()` | Falsy in boolean context |

Example:

```js
expect(value).toBeDefined();
expect(false).toBeFalsy();
``` :contentReference[oaicite:3]{index=3}

---

## 🔢 3. Number Matchers

Used for numeric comparisons:

| Matcher | Purpose |
|---------|---------|
| `toBeGreaterThan(number)` |
| `toBeGreaterThanOrEqual(number)` |
| `toBeLessThan(number)` |
| `toBeLessThanOrEqual(number)` |
| `toBeCloseTo(number, digits?)` | Floating-point comparisons |

Example:

```js
expect(10).toBeGreaterThan(5);
expect(0.1 + 0.2).toBeCloseTo(0.3);
``` :contentReference[oaicite:4]{index=4}

---

## 🔤 4. String Matchers

| Matcher | Purpose |
|---------|---------|
| `toMatch(regexOrString)` | Check regex match |

Example:

```js
expect("Hello World").toMatch(/World/);
``` :contentReference[oaicite:5]{index=5}

---

## 📋 5. Array and Iterable Matchers

| Matcher | Purpose |
|---------|---------|
| `toContain(item)` | Check array/set contains item |

Example:

```js
expect([1, 2, 3]).toContain(2);
``` :contentReference[oaicite:6]{index=6}

---

## ⚠️ 6. Exception/Error Matchers

| Matcher | Purpose |
|---------|---------|
| `toThrow(error?)` | Expect a function to throw |

Example:

```js
expect(() => { throw new Error(); }).toThrow();
``` :contentReference[oaicite:7]{index=7}

---

## 🧠 7. Snapshot Matchers

| Matcher | Purpose |
|---------|---------|
| `toMatchSnapshot()` | Compare value to stored snapshot |
| `toMatchInlineSnapshot()` | Inline snapshot test |

Advanced features allow property matchers for partial matching. :contentReference[oaicite:8]{index=8}

---

## ✨ 8. Custom Matchers (`expect.extend()`)

You can write your own matcher functions via:

```js
expect.extend({
  toBeWithinRange(received, min, max) {
    const pass = received >= min && received <= max;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be within range ${min}..${max}`
          : `expected ${received} to be within range ${min}..${max}`,
    };
  },
});
