import express, { type Response } from 'express';
import type { Diagnosis } from '../types.ts';
import DiagnosesService from '../services/DiagnosesService.ts';

const router = express.Router();


router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(DiagnosesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;
