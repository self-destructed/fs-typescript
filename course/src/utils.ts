export const assertNever = (value: never): never => {
  throw new Error(`Unhandled part: ${JSON.stringify(value)}`);
};
