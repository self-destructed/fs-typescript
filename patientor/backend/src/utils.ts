import { Gender, type PatientEntry } from './types.ts';

const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;

const parseString = (value: unknown): string => {
  if (!value || !isString(value)) throw new Error('Incorrect or missing value');
  return value;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (value: unknown): string => {
  const date = parseString(value);
  if (!isDate(date)) throw new Error('Incorrect date: ' + date);
  return date;
};

const isGender = (value: string): value is Gender =>
  Object.values(Gender).includes(value as Gender);

const parseGender = (value: unknown): Gender => {
  const gender = parseString(value);
  if (!isGender(gender)) throw new Error('Incorrect gender: ' + gender);
  return gender;
};

export const toNewPatientEntry = (object: unknown): PatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: PatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};
