function calculateBmi(height: number, weight: number): string {
  const bmi = weight / ((height / 100) ** 2)

  if (bmi < 16.0) return "Severe thinness"
  if (bmi < 17.0) return "Moderate thinness"
  if (bmi < 18.5) return "Mild thinness"
  if (bmi < 25.0) return "Normal range"
  if (bmi < 30.0) return "Overweight"
  if (bmi < 35.0) return "Obese Class I"
  if (bmi < 40.0) return "Obese Class II"
  return "Obese Class III"
}

const parseArgs = (args: string[]): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  const height = Number(args[2])
  const weight = Number(args[3])

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Arguments must be numbers")
  }

  return { height, weight }
}

try {
  const { height, weight } = parseArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error:", error.message)
  }
}

export {}
