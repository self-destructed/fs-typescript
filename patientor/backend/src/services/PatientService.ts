import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patients.ts";
import type { Patient, PatientEntry, PublicPatient } from "../types.ts";

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): PublicPatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: PatientEntry): Patient => {
  const newPatient = { id: uuid(), ...entry };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};
