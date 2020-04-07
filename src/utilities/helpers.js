export const logError = (error) => {
  __DEV__ && console.warn(error);
};

export const shouldRefetchData = (timestamp) => {
  const fullDay = 24 * 60 * 60 * 1000;
  const today = new Date();

  if (today.getTime() - timestamp > fullDay) {
    return true;
  }

  return today.getDay() !== new Date(timestamp);
};
