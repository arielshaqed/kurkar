// Ava macro for running marble diagram based tests.

import { ExecutionContext, Macro } from 'ava';
export { ExecutionContext } from 'ava';
import { TestScheduler } from 'rxjs/testing';
export { TestScheduler } from 'rxjs/testing';

// Extract type of RunHelpers, parameter to TestScheduler.run function.
type FirstArgType<T extends (a: any) => any> = T extends ((s: infer S) => any) ? S : never;
export type RunHelpers = FirstArgType<FirstArgType<TestScheduler['run']>>;

type M = Macro<[(t: ExecutionContext, sched: TestScheduler, r: RunHelpers) => void | Promise<void>]>;

// Cannot use bind as t.deepEqual has strange return type.
const defaultEquals = (t: ExecutionContext, a: any, e: any) => { t.deepEqual(a, e); };

export function withEquals(
  eql: (t: ExecutionContext, actual: any, expected: any) => boolean | void = defaultEquals
): M {
  return (t: ExecutionContext, testFn: Function) => {
    const sched = new TestScheduler(eql.bind(undefined, t));
    sched.run((helpers) => testFn(t, sched, helpers));
  };
}

export const marbles = withEquals();

export default marbles;
