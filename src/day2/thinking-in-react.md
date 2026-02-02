# Thinking in React — Summary

**Thinking in React** describes a structured way to design and build user interfaces using React. Instead of starting with code, it encourages you to think about the UI, data, and interactions in a clear, step-by-step manner.

## 1. Break the UI into components
Start by looking at the design and dividing it into small, reusable pieces. Each piece should have a single responsibility and become a React component.

## 2. Build a static version first
Create the UI without any interactivity. Focus only on structure and layout so the component hierarchy is clear before adding logic.

## 3. Identify what should be state
Determine which data changes over time. Only data that can change and affects rendering should be treated as state.

## 4. Decide where state should live
Place state in the closest common parent component that needs it. This ensures a single source of truth and predictable data flow.

## 5. Add interactivity
Finally, connect user actions to state updates so the UI responds automatically when data changes.

## Core idea
React apps work best when:
- UI is broken into clear components
- Data flows in one direction (parent to child)
- State is minimal and well-placed

This mindset makes applications easier to understand, scale, and maintain.
