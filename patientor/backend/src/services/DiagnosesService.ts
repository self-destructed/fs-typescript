import diagnosesData from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const diagnoses = diagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};
