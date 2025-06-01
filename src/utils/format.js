export const formatDate = (date, locale = "en-IN", options = {}) => {
  const defaultOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
};

export const formatCurrency = (amount, currency = "INR", locale = "en-IN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const extractDate = (dateStr) => {
  return new Date(dateStr).toISOString().split("T")[0]; 
};