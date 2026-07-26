import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients.ts";
import type { Patient, NewPatient, NonSensitivePatient, EntryWithoutId, Entry } from "../types.ts";

const patients: Patient[] = patientsData;

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

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;

  const newEntry: Entry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
