import { Router } from 'express';
import type { Request, Response } from 'express';
import PatientService from '../services/PatientService.ts';
import type { NewPatient, Patient, NonSensitivePatient } from '../types.ts';
import { newPatientParser, errorMiddleware } from '../middleware.ts';

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

router.use(errorMiddleware);

export default router;
