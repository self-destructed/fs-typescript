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

console.log(calculateBmi(180, 74))
