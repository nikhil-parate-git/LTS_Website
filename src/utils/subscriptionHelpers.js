export const FEATURES_PREVIEW = 5;

export const fmt = (n) => Number(n).toLocaleString("en-IN");

export const convertDaysToLabel = (days) => {
  const map = { 30: "1 Month", 90: "3 Months", 180: "6 Months", 365: "12 Months" };
  return map[days] || `${days} days`;
};

export const convertDaysToMonths = (days) => {
  const map = { 30: 1, 90: 3, 180: 6, 365: 12 };
  return map[days] || days;
};