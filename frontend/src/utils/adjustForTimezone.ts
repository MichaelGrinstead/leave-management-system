export const adjustForTimezone = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000);
};
