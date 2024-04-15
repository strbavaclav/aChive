import { Meal } from "data/mock/meals";

export const featuredMealsFilter = (
  meals: Meal[],
  timestamps: string[]
): Meal[] => {
  if (timestamps.length === 0) {
    throw new Error("The timestamps array must not be empty");
  }

  const times: Date[] = timestamps
    .map((ts) => new Date(parseInt(ts)))
    .map((time) => new Date(0, 0, 0, time.getHours(), time.getMinutes()));

  const earliestTime: Date = times.reduce((a, b) => (a < b ? a : b));

  const mealsWithDifference = meals.map((meal) => {
    const [hours, minutes] = meal.bestTimeToEat.split(":").map(Number);
    const mealTime = new Date(0, 0, 0, hours, minutes);
    const diff = Math.abs(mealTime.getTime() - earliestTime.getTime());

    return {
      ...meal,
      timeDifference: diff,
    };
  });

  mealsWithDifference.sort((a, b) => a.timeDifference - b.timeDifference);

  return mealsWithDifference.slice(0, 4);
};
