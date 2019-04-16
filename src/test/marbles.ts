import test from 'ava';
import marbles, { withEquals, ExecutionContext, TestScheduler, RunHelpers } from '../marbles';
import { debounceTime } from 'rxjs/operators';


// Current TypeScript and Ava bindings are unable to infer type of _t, _s.
test('marbles macro', marbles, (_t: ExecutionContext, _s: TestScheduler, helpers: RunHelpers) => {
  const letters = 'the quick brown fox jumps over the lazy dog|';
  const source$ = helpers.hot(letters);
  helpers.expectObservable(source$).toBe(letters);
});

function halveSpeed(x: { frame: number }) { return ({...x, frame: x.frame / 2}); }

test(
  'withEquals generates a macro',
  withEquals((t: ExecutionContext, a: any, e: any) => t.deepEqual(a, e.map(halveSpeed))),
  (_t: ExecutionContext, _s: TestScheduler, helpers: RunHelpers) => {
    const source$ = helpers.hot('abcde');
    helpers.expectObservable(source$).toBe('a-b-c-d-e-');
  });

test('marbles passes ExecutionContext', marbles, (t: ExecutionContext, _s: TestScheduler, _h: RunHelpers) => {
  t.truthy(17);
});

test('marbles passes TestScheduler', marbles, (_t: ExecutionContext, s: TestScheduler, helpers: RunHelpers) => {
  const sentence = 'the-quick-brown-fox-jumps-over-the-lazy-dog-|';
  const lasts    = '---e-----k-----n---x-----s----r---e----y---g|';
  const actual$ = helpers.hot(sentence).pipe(debounceTime(1, s));
  helpers.expectObservable(actual$).toBe(lasts);
});

test('marbles async', marbles, async (t: ExecutionContext, s: TestScheduler, helpers: RunHelpers) => {
  const word = 'xyzzy|';
  const last = await helpers.hot(word).toPromise();
  t.assert(last === 'y');
});
