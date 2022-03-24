import pino from 'pino';
import { Record, String, Static } from 'runtypes';

export type Success<T> = {
  success: true;
  value: T;
};
export type Failure = {
  success: false;
  message: string;
  innerError: Error;
  details?: unknown;
};

export type Result<T> = Success<T> | Failure;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type Environment = 'dev' | 'prod';

export type Logger = pino.Logger;

export interface Config {
  name: string;
  port: string | number;
  logLevel: LogLevel;
  environment: Environment;
  version: string;
}

const BodyPump = Record({
  name: String,
  1: String,
  2: String,
  3: String,
  4: String,
  5: String,
  6: String,
  7: String,
  8: String,
  9: String,
  10: String,
});
//
// export type FirestoreParams = Static<typeof FirestoreParams>;
export type BodyPump = Static<typeof BodyPump>;
