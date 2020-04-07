import { AsyncStorage } from 'react-native';
import { logError } from './helpers';

const globalInfoTimestamp = 'globalInfoTimestamp';
const globalInfo = 'globalInfo';

export const getGlobalInfoTimestamp = async () => {
  const value = await getItem(globalInfoTimestamp);
  return Number(value);
};

export const getGlobalInfo = async () => {
  try {
    const value = await getItem(globalInfo);
    return JSON.parse(value);
  } catch (error) {
    logError(error);
  }
};

export const cacheGlobalInfo = async (data) => {
  try {
    await setItem(globalInfoTimestamp, Date.now().toString());
    await setItem(globalInfo, JSON.stringify(data));
  } catch (error) {
    logError(error);
  }
};

const getItem = (name) => {
  return new Promise((resolve) => {
    AsyncStorage.getItem(name, (error, value) => {
      if (error) {
        logError(error);
        return resolve(null);
      }

      resolve(value);
    });
  });
};

const setItem = (name, value) => {
  return new Promise((resolve) => {
    AsyncStorage.setItem(name, value, (error) => {
      if (error) {
        logError(error);
      }

      resolve();
    });
  });
};
