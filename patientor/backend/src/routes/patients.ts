import { Router } from 'express';
import type { Request, Response } from 'express';
import PatientService from '../services/PatientService.ts';
import type { NewPatient, Patient, NonSensitivePatient, EntryWithoutId, Entry } from '../types.ts';
import { newPatientParser, newEntryParser, errorMiddleware } from '../middleware.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  res.json(PatientService.getPatients());
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = PatientService.getPatientById(req.params.id as string);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = PatientService.addPatient(req.body);
  return res.json(newPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const entry = PatientService.addEntry(req.params.id, req.body);
  if (entry) {
    return res.json(entry);
  } else {
    return res.sendStatus(404);
  }
});

router.use(errorMiddleware);

export default router;
