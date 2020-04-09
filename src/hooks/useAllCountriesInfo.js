import { useState, useContext, useRef } from 'react';
import { Context } from '../contexts/GlobalStateContext';
import Api from '../constants/Api';

const ignored = ['World', ''];

const fetchData = async (url, { controller }) => {
  const res = await fetch(url, { signal: controller.current.signal });
  const data = await res.json();

  return { data, isFresh: true };
};

const useAllCountriesInfo = () => {
  const { allCountriesInfo, setAllCountriesInfo } = useContext(Context);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef(new AbortController());

  const cancel = () => {
    controller.current.abort();
  };

  const fetchAllCountriesInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      controller.current = new AbortController();

      let { data, isFresh } = await fetchData(Api.fetchAllCountriesInfo, { controller });
      data = data.filter((item) => !ignored.includes(item.country));

      setAllCountriesInfo(data);
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(error);
      }
    }

    setLoading(false);
  };

  return {
    fetchAllCountriesInfo,
    cancel,
    isLoading,
    allCountriesInfo,
    error,
  };
};

export default useAllCountriesInfo;
