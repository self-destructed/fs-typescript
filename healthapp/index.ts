import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

interface BmiQuery {
  height: number
  weight: number
}

const parseBmiQuery = (height: unknown, weight: unknown): BmiQuery => {
  const h = Number(height);
  const w = Number(weight);

  if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
    throw new Error("malformatted parameters");
  }

  return { height: h, weight: w };
};

interface ExercisesBody {
  daily_exercises: number[]
  target: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseExercisesBody = (body: any): ExercisesBody => {
  if (!body || typeof body !== 'object') {
    throw new Error("malformatted parameters");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = body;

  if (daily_exercises === undefined || target === undefined) {
    throw new Error("parameters missing");
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every((h: unknown): h is number => typeof h === 'number')) {
    throw new Error("malformatted parameters");
  }

  if (typeof target !== 'number' || target <= 0) {
    throw new Error("malformatted parameters");
  }

  return { daily_exercises, target };
};

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = parseExercisesBody(req.body);
    return res.json(calculateExercises(daily_exercises, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Unknown error' });
  }
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseBmiQuery(req.query.height, req.query.weight);
    return res.json({ weight, height, bmi: calculateBmi(height, weight) });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Unknown error' });
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
