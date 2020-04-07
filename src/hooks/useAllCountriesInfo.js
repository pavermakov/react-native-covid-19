import React from 'react';
import { Context } from "../contexts/GlobalStateContext";
import Api from "../constants/Api";

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
      const res = await fetch(Api.fetchGlobalInfo, { signal: controller.current.signal });
      const data = await res.json();

      setAllCountriesInfo(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
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
    error
  };
};

export default useAllCountriesInfo;
