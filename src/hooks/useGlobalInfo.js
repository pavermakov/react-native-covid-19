import React, { useState, useRef, useContext } from 'react';
import { Context } from "../contexts/GlobalInfoContext";
import Api from "../constants/Api";

const useGlobalInfo = () => {
  const { globalInfo, setGlobalInfo } = useContext(Context);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(new AbortController());

  const cancel = () => {
    controller.current.abort();
  };

  const fetchGlobalInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      controller.current = new AbortController();

      const res = await fetch(Api.fetchGlobalInfo, { signal: controller.current.signal });
      const data = await res.json();

      setGlobalInfo(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }

    setLoading(false);
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
