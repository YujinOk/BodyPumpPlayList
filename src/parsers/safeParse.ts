import { Runtype } from 'runtypes';
import { Result } from '../types';

export function safeParse<T>(value: unknown, schema: Runtype<T>): Result<T> {
  const result = schema.validate(value);

  return result.success
    ? { ...result }
    : {
        success: false,
        innerError: new Error(result.code),
        message: result.message,
        details: result.details,
      };
}
