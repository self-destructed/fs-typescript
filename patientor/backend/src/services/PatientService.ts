import patientsData from "../../data/patients.ts";
import type { PublicPatient } from "../types.ts";

const getPatients = (): PublicPatient[] => {
  return patientsData.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getPatients
};
