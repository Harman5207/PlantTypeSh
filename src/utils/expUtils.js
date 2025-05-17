export const expValues = {
  registerPlant: 10, // Register a plant
  postUpdate: 20, // Makes a post on the social media tab
  weeklyHealthBonus: 50, // The plant is mostly healthy throughout the week (MAYBE)
  challengeComplete: 150, // Completing a seasonal challenge
  rarePlantBonus: 75, // Registering a rare plant
  onTimeWatering: 15, // Watering your plant
};

export function addExp(currentExp, activityType) {
  return currentExp + (expValues[activityType] || 0);
}
