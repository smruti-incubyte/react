# Redux - Introduction and Guide

## What is Redux?

Redux is a **pattern and library for managing and updating global application state**. It provides a centralized approach to state management where:

- The **UI triggers events** called **"actions"** to describe what happened
- Separate **update logic** called **"reducers"** updates the state in response
- It serves as a **centralized store** for state that needs to be used across your entire application
- Rules ensure that the state can only be updated in a **predictable fashion**

## Why Should I Use Redux?

Redux helps you manage **"global" state** - state that is needed across many parts of your application.

### Key Benefits:

The patterns and tools provided by Redux make it easier to understand:
- **When** the state in your application is being updated
- **Where** the state updates are happening
- **Why** the state is changing
- **How** the state is being updated
- How your application logic will behave when those changes occur

Redux guides you towards writing code that is **predictable and testable**, which helps give you confidence that your application will work as expected.

## When Should I Use Redux?

Redux helps you deal with shared state management, but like any tool, it has **tradeoffs**:

### The Tradeoffs:
- ❌ More concepts to learn
- ❌ More code to write
- ❌ Adds indirection to your code
- ❌ Requires following certain restrictions
- ⚖️ Trade-off between short term and long term productivity

### Redux is More Useful When:

✅ You have **large amounts** of application state that are needed in many places in the app

✅ The app state is **updated frequently** over time

✅ The **logic to update** that state may be complex

✅ The app has a **medium or large-sized codebase**, and might be worked on by many people

> **Important**: Not all apps need Redux. Take some time to think about the kind of app you're building, and decide what tools would be best to help solve the problems you're working on.

---

## Redux and React Context - Historical Perspective

### The Problem Redux Was Invented to Solve (2015)

Redux was invented as an implementation of the **Flux architecture**, which was created to deal with limitations in event-trigger-based state management (like Backbone).

**The Problem with Event-Based State:**
```
You set user.firstName → triggers "change firstName" event → 
some other code listens → triggers another event → ...
```

Next thing you know, you're **15 events down one big synchronous call stack**, and you have no idea why this happened in the first place.

**That's what Flux was invented to solve, and Redux basically perfected that particular approach.**

### The Accidental Solution (2015-2017)

Because Redux used the old-style React Context API from its beginning, using Redux in a React app also **somewhat accidentally solved another common problem**:

**The Prop Drilling Problem:**
- Many different parts of my app need to use the same state at the same time
- I would normally have to **lift that state up** maybe all the way to the root app component
- Then **prop-drill** and pass that data as props through every level of the component tree
- This is a **royal pain**

So using Redux with React let people **side-step that issue**—that is a reason why many people picked Redux in '15, '16, '17.

---

## Redux and React Context - Modern Era (2018+)

### React 16.3 Changed Everything

With **React 16.3**, React introduced a **new, improved Context API** that was recommended for production usage from day one.

**What Context Does:**
- Acts as a **dependency injection mechanism** scoped to some portion of your subtree
- You say "Here is a value"
- Any portion of that component subtree can ask to read the value
- **That's literally all it does**

### The Key Insight: Context is NOT State Management

❗ **Important Clarification:**

Many people compare:
> "Should I use Context or should I use Redux?"

And they seem to think that **Context itself is a state management system**.

### It's NOT.

**Context is a dependency injection mechanism**, and you can put whatever value you want in Context. Most often you are the one managing that state in a React component with:
- `useState` hook, or
- `useReducer` hook

You're the one deciding:
- Where the state lives
- How to update it
- Then putting the value into Context for distribution

### The Correct Comparison:

```
useReducer + useContext = State Management System (equivalent to Redux)

Context by itself ≠ State Management System
```

### When to Use Each:

**Use Context If:**
- You only need to avoid passing data as props through 15 levels of your components
- That's literally what Context was invented to do
- You don't need Redux just for that capability

---

## Redux and Other Modern Tools

### Server State Caching Tools

Almost everyone needs to **cache some server state** in their apps:
- Fetch data on users, posts, comments
- Display them in the UI

#### GraphQL + Apollo Client

**Apollo Client** has lots of features built in:
- Handles a **normalized cache** of all the data
- If you ask for the same thing, it's already there
- Provides a nice interface: `useQuery` → returns `{ data, isLoading, error }`
- You can decide what to render based on those values

**If the only thing you were doing with Redux was storing cached data from the server**, and you choose to use GraphQL + Apollo Client:
- You've just fulfilled the use case you were previously choosing Redux for
- **You don't need Redux for that situation**

#### REST + React Query / SWR

**React Query** and **SWR** do the same kind of thing, but focused around **REST APIs**:
- "Here's my URL, fetch it"
- Give me back `{ data, isLoading, error }`
- They cache the data efficiently and can share it
- Again, if that's the only thing you were doing with Redux, **you don't really need Redux at that point**

### Important Limitation:

While you can do **some limited bits of client state management** with Apollo or React Query, that's really not the use cases they were meant for.

---

## How to Think About Redux

### Redux is a Generic State Management Tool

Redux is a **very generic state management tool** that can be used for a broad array of use cases:

- ✅ Caching state from a server
- ✅ UI state
- ✅ Other complex data management on the client

**But** it's probably not going to be the **best or most efficient tool** at any of those specific use cases.

### The Specialization Tradeoff:

| Tool | Specialization | Versatility |
|------|---------------|-------------|
| **Redux** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Apollo Client** | ⭐⭐⭐⭐⭐ (GraphQL) | ⭐⭐ |
| **React Query/SWR** | ⭐⭐⭐⭐⭐ (REST caching) | ⭐⭐ |
| **Context + useReducer** | ⭐⭐⭐ (Simple state) | ⭐⭐⭐ |

### Making the Right Choice:

Ask yourself these questions:

1. **What specific problems are you trying to solve?**
2. **What problems do these tools solve?**
3. **Where's the overlap between those?**

### Decision Framework:

```
┌─────────────────────────────────────────────────────────────┐
│ Need to avoid prop drilling only?                            │
│ → Use React Context                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Only need server data caching (GraphQL)?                     │
│ → Use Apollo Client                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Only need server data caching (REST)?                        │
│ → Use React Query or SWR                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Need complex client-side state management?                   │
│ Multiple use cases: UI state, client data, some caching?     │
│ Medium to large app with complex state logic?                │
│ → Use Redux                                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

### What Redux Is:
- A **generic state management** library
- Can handle **many different use cases**
- Might not be the **absolute best** at any single one
- But **very versatile** for complex applications

### What Redux Is NOT:
- ❌ Not just a way to avoid prop drilling (use Context)
- ❌ Not primarily for server data caching (use Apollo/React Query)
- ❌ Not always necessary for every React app

### The Bottom Line:

Redux shines when you need **versatile, complex client-side state management** that goes beyond what specialized tools offer. Choose based on your specific needs, not just popularity or habit.
