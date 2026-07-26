import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients.ts";
import type { Patient, NewPatient, NonSensitivePatient } from "../types.ts";

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...entry, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};
