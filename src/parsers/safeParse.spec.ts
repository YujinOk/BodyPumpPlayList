import { Literal, Number, Record, Static, Tuple } from 'runtypes';

import { Result } from '../types';

import { safeParse } from './safeParse';

const SomeRuntypeRecord = Record({
  type: Literal('someType'),
  location: Tuple(Number, Number),
  mass: Number,
});

type SomeRuntypeRecord = Static<typeof SomeRuntypeRecord>;
interface TestType {
  name: string;
  value: unknown;
  expected: Result<SomeRuntypeRecord>;
}

describe('safeParse', () => {
  const successfulValue: SomeRuntypeRecord = { type: 'someType', location: [1, 2], mass: 34 };
  const tests: TestType[] = [
    {
      name: 'should return Success when value is correct',
      value: successfulValue,
      expected: {
        success: true,
        value: successfulValue,
      },
    },
    {
      name: 'should return CONTENT_INCORRECT Failure when value empty',
      value: {},
      expected: {
        success: false,
        message: 'Expected { type: "someType"; location: [number, number]; mass: number; }, but was incompatible',
        innerError: new Error('CONTENT_INCORRECT'),
      },
    },
    {
      name: 'should return CONTENT_INCORRECT Failure when value has some correct properties',
      value: { ...successfulValue, type: 'error' },
      expected: {
        success: false,
        message: 'Expected { type: "someType"; location: [number, number]; mass: number; }, but was incompatible',
        innerError: new Error('CONTENT_INCORRECT'),
      },
    },
    {
      name: 'should return TYPE_INCORRECT Failure when value is null',
      value: null,
      expected: {
        success: false,
        message: 'Expected { type: "someType"; location: [number, number]; mass: number; }, but was null',
        innerError: new Error('TYPE_INCORRECT'),
      },
    },
  ];

  tests.map((test) => {
    it(`${test.name}`, () => {
      const parseResult = safeParse(test.value, SomeRuntypeRecord);
      expect(parseResult).toMatchObject(test.expected);
    });
  });
});
