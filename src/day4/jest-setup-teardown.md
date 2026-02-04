# Jest Setup and Teardown Guide

## Overview
Jest provides setup and teardown hooks to manage test initialization and cleanup. Key hooks include `beforeEach`, `afterEach`, `beforeAll`, and `afterAll`, supporting both sync and async code via promises or `done()` callbacks. These ensure tests run independently without interference.

## Repeating Setup (Per Test)
Use `beforeEach` to run code before each test, and `afterEach` for cleanup after.

**Example:**
```javascript
let cities;

beforeEach(() => {
  cities = initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city population', () => {
  expect(cities.population).toBe(1000000);
});
Async version returns a promise:

javascript
beforeEach(async () => {
  await initializeCityDatabase();
});
One-Time Setup (Per File)
beforeAll runs once before all tests; afterAll cleans up after.

Example:

javascript
beforeAll(async () => {
  return initializeCityDatabase();
});

afterAll(async () => {
  return clearCityDatabase();
});
Perfect for expensive shared resources like DB connections.

Scoping Rules
File-level hooks apply to all tests.

describe block hooks scope to tests inside.

Order: outer beforeAll → outer beforeEach → inner beforeEach → test → inner afterEach → outer afterEach → inner afterAll → outer afterAll.

Nested Example:

javascript
describe('outer', () => {
  beforeAll(() => console.log('1 - outer beforeAll'));
  afterAll(() => console.log('5 - outer afterAll'));
  
  test('outer test 1', () => console.log('3 - outer test 1'));
  
  describe('inner', () => {
    beforeAll(() => console.log('2 - inner beforeAll'));
    afterAll(() => console.log('4 - inner afterAll'));
    test('inner test', () => console.log('inner test'));
  });
});
Execution Order
Jest processes describe blocks first, then runs tests serially. Hooks follow declaration order; nested after* run inner-to-outer.

Best Practices
Use beforeEach for repeatable state reset.

Isolate failures with test.only or describe.only.

Handle async properly to avoid test timeouts.

Clear mocks with afterEach(() => { jest.clearAllMocks(); });.