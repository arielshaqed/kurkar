# Kurkar: Ava macros to test RxJS

Kurkar helps you test [RxJS][rxjs] operators and pipelines with
[marbles][marbles] using [Ava][ava].  Ava macros let you write concise
tests.

## Install

```bash
npm install --save kurkar
```

## Basic usage

```js
import test from 'ava';
import marbles from 'marbles';

test('observable', marbles, (_t, _sched, helpers) => {
  const letters = 'the quick brown fox jumps over the lazy dog|';
  const source$ = helpers.hot(letters);
  helpers.expectObservable(source$).toBe(letters);
});
```

Kurkar provides an [Ava test macro][macros] to easily set up RxJS
tests in Ava.  Include the macro function `marbles` before the test
function to hook up an RxJS [`TestScheduler`][TestScheduler] to the
Ava execution context "`t`".  The test function will be run inside a
test scheduler, with these parameters:
* `t`: Ava execution context for this test.
* `sched`: RxJS `TestScheduler` running this test.  Use when you need
  to pass a scheduler argument into some operators.
* `helpers`: Helper functions created by
  [`TestScheduler.run`][TestScheduler.run] for easily creating and
  comparing Observables.

`TestScheduler` runs synchronously, so the test function is _not_
`async`.

The `marbles` macro uses `t.deepEqual` to compare actual and expected
results.  Pass a different comparison function to `withEquals` to
generate other versions of the macro.  `marbles` is just
```js
const marbles = withEquals((t, a, e) => t.deepEqual(a, e));
```

## TypeScript support

Kurkar fully supports TypeScript types and exports useful types.  You
do not need to install additional `@types` to enjoy TypeScript.

Here's a typed version of the above test:
```ts
import test from 'ava';
import marbles, { withEquals, ExecutionContext, TestScheduler, RunHelpers } from '../marbles';

test('observable', marbles, (_t: ExecutionContext, _sched: TestScheduler, helpers: RunHelpers) => {
  const letters = 'the quick brown fox jumps over the lazy dog|';
  const source$ = helpers.hot(letters);
  helpers.expectObservable(source$).toBe(letters);
});
```

Due to current limitations with Ava types, TypeScript language servers
currently cannot always deduce the types of the test function parameters.

## FAQ

### Why _another_ Ava RxJS marbles library?

Because it provides an Ava test macro, Kurkar removes the most
boilerplate from your tests.  It is native TypeScript and can provide
exact type-checking.

### Why the name?

"Kurkar" ("כורכר") is a soft middle-eastern sandstone -- a _very_ different rock from marble.

### What are all these other names?

* [Ava][ava]: A JavaScript and TypeScript test runner.
* [RxJS][rxjs]: A library for composing asynchronous and event-based
  programs by using observable sequences.
* [Marbles][marbles]: Diagram-based testing of RxJS operators and pipelines.

[ava]: https://github.com/avajs/ava
[rxjs]: http://rxjs-dev.firebaseapp.com/
[marbles]: https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md
[macros]: https://github.com/avajs/ava/blob/master/docs/01-writing-tests.md#reusing-test-logic-through-macros
[testscheduler]: https://rxjs-dev.firebaseapp.com/api/testing/TestScheduler
[testscheduler.run]: https://rxjs-dev.firebaseapp.com/api/testing/TestScheduler#run-
