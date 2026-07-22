import { Router } from 'express';
import PatientService from '../services/PatientService.ts';

const router = Router();

router.get('/', (_req, res) => {
  res.json(PatientService.getPatients());
});

export default router;
