import { Transform } from 'class-transformer';

export function TransformToInt() {
  return Transform(({ value }) => (value ? parseInt(value, 10) : undefined));
}

export function TransformToBoolean() {
  return Transform(({ value }) => value === 'true' || value === true);
}

export function TransformToArray() {
  return Transform(({ value }) => (typeof value === 'string' ? [value] : value));
}
