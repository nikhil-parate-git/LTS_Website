// utils/subscriptionHelpers.js

export const FEATURES_PREVIEW = 4;

export const fmt = (n) => Number(n).toLocaleString("en-IN");

const DURATION_LABEL = {
  30:  "1 Month",
  180: "6 Months",
  365: "1 Year",
  730: "2 Years",
};

export const convertDaysToLabel = (days) =>
  DURATION_LABEL[Number(days)] || `${days} Days`;

export const convertDaysToMonths = (days) => {
  const map = { 30: 1, 180: 6, 365: 12, 730: 24 };
  return map[Number(days)] || Math.round(days / 30);
};