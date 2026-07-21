type Rating = 1 | 2 | 3;
type ExerciseHours = number[];

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

const RATING_DESCRIPTIONS: Record<Rating, string> = {
  3: "great job keep it up",
  2: "not too bad but could be better",
  1: "not bad but could be better",
};

const periodLength = (period: ExerciseHours): number => period.length;

const trainingDays = (period: ExerciseHours): number =>
  period.filter((hours) => Boolean(hours)).length;

const average = (period: ExerciseHours): number =>
  period.reduce((sum, hours) => sum + hours, 0) / period.length;

const isSuccess = (avg: number, target: number): boolean => avg >= target;

const calculateRating = (avg: number, target: number): Rating => {
  if (avg >= target * 1.3) return 3;
  if (avg >= target) return 2;
  return 1;
};

const ratingDescription = (rating: Rating): string => RATING_DESCRIPTIONS[rating];

const calculateExercises = (dailyHours: ExerciseHours, target: number): ExerciseResult => {
  const avg = average(dailyHours);
  const rating = calculateRating(avg, target);

  return {
    periodLength: periodLength(dailyHours),
    trainingDays: trainingDays(dailyHours),
    success: isSuccess(avg, target),
    rating,
    ratingDescription: ratingDescription(rating),
    target,
    average: avg,
  };
};

const parseArgs = (args: string[]): { target: number; dailyHours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error("Arguments must be numbers");
  }

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}

export {};
