import { Router } from 'express';
import type { Request, Response } from 'express';
import PatientService from '../services/PatientService.ts';
import type { NewPatient, Patient, PublicPatient } from '../types.ts';
import { newPatientParser, errorMiddleware } from '../middleware.ts';

const router = Router();

router.get('/', (_req: Request, res: Response<PublicPatient[]>) => {
  res.json(PatientService.getPatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = PatientService.addPatient(req.body);
  return res.json(newPatient);
});

router.use(errorMiddleware);

export default router;
