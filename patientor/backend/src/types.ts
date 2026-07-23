import { z } from 'zod';

export type Diagnosis = {
  "code": string,
  "name": string,
  "latin"?: string,
};

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string
}

export type PublicPatient = Omit<Patient, 'ssn'>;
