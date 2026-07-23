import { ZodError } from 'zod';
import { newPatientSchema } from './types.ts';
import type { Request, Response, NextFunction } from 'express';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
    return;
  }
  next(error);
};
