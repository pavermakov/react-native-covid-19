import { useState, useRef, useContext } from 'react';
import { Context } from '../contexts/GlobalStateContext';
import Api from '../constants/Api';
import {
  getGlobalInfo,
  getGlobalInfoTimestamp,
  cacheGlobalInfo,
} from '../utilities/localStorage';
import { logError, isApiDataRefreshRequired } from '../utilities/helpers';

const fetchData = async (url, { controller }) => {
  const timestamp = await getGlobalInfoTimestamp();

  if (timestamp && !isApiDataRefreshRequired()) {
    const cachedData = await getGlobalInfo();
    return { data: cachedData };
  }

  const res = await fetch(url, { signal: controller.current.signal });
  const data = await res.json();

  return { data, isFresh: true };
};

const useGlobalInfo = () => {
  const {
    globalInfo,
    setGlobalInfo,
  } = useContext(Context);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(new AbortController());

  const fetchGlobalInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      controller.current = new AbortController();

      const { data, isFresh } = await fetchData(Api.fetchGlobalInfo, { controller });
      setGlobalInfo(data);

      if (isFresh) {
        await cacheGlobalInfo(data);
      }
    } catch (e) {
      if (error.name !== 'AbortError') {
        logError(e);
        setError(e);
      }
    }

    setLoading(false);
  };

  const cancel = () => {
    controller.current.abort();
  };

  return {
    fetchGlobalInfo,
    cancel,
    isLoading,
    globalInfo,
    error,
  };
};

export default useGlobalInfo;
