import {
  useState,
} from 'react';

const useLoading = () => {
  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const start = () =>
    setLoading(true);

  const stop = () =>
    setLoading(false);

  return {
    loading,
    start,
    stop,
  };
};

export default useLoading;