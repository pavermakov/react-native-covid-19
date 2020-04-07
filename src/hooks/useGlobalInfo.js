import React, { useState, useRef, useContext } from 'react';
import { Context } from "../contexts/GlobalStateContext";
import Api from "../constants/Api";
import {
  getGlobalInfo,
  getGlobalInfoTimestamp,
  cacheGlobalInfo,
} from "../utilities/localStorage";
import { logError, shouldRefetchData } from "../utilities/helpers";

const useGlobalInfo = () => {
  const {
    globalInfo,
    setGlobalInfo,
    globalInfoTimestamp,
  } = useContext(Context);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(new AbortController());

  const fetchGlobalInfo = async () => {
    const timestamp = await getGlobalInfoTimestamp();

    if (timestamp && shouldRefetchData()) {
      const cachedGlobalInfo = await getGlobalInfo();
      return void setGlobalInfo(cachedGlobalInfo);
    }

    setLoading(true);
    setError(null);

    try {
      controller.current = new AbortController();

      const res = await fetch(Api.fetchGlobalInfo, { signal: controller.current.signal });
      const data = await res.json();

      setGlobalInfo(data);
      await cacheGlobalInfo(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        logError(error);
        setError(error);
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
    error
  };
};

export default useGlobalInfo;
