# What is React Testing Library?

React Testing Library (RTL) is a lightweight utility for testing React components. It helps you write tests that focus on how your components behave from the user's perspective rather than how they are implemented internally.

## Key Points

- **User-centric testing**: RTL encourages writing tests that interact with the UI the way a real user would — e.g., finding buttons or form fields by visible text or labels — instead of inspecting internal implementation details.

- **Built on DOM Testing Library**: Under the hood, RTL uses utilities that query and interact with the DOM (simulated in a test environment) in user-like ways.

- **Maintains test reliability**: By avoiding tests tied to implementation, your tests are less likely to break when you refactor your components but not their behavior.

- **Not a test runner**: React Testing Library isn't a framework like Jest — it's a set of helpers you use with a test runner to write effective tests.