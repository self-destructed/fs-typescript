import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();

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

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
