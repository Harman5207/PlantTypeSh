// src/utils/rankUtils.js
export const ranks = [
  { name: "Bronze Bud", minExp: 0 },
  { name: "Silver Sprout", minExp: 500 },
  { name: "Gold Garden", minExp: 1500 },
  { name: "Diamond Dandelion", minExp: 3000 },
  { name: "Platinum Petal", minExp: 5000 },
];

export function getRankFromExp(exp) {
  return ranks
    .slice()
    .reverse()
    .find(rank => exp >= rank.minExp)?.name || "Bronze Bud";
}
