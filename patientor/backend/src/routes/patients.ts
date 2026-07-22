import { Router } from 'express';
import PatientService from '../services/PatientService.ts';
import { toNewPatientEntry } from '../utils.ts';

const router = Router();

router.get('/', (_req, res) => {
  res.json(PatientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = PatientService.addPatient(newPatientEntry);
    return res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(400).json({ error: error.message });
    return res.status(400).json({ error: 'Unknown error' });
  }
});

export default router;
