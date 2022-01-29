import { useState, useEffect } from 'react';

const useDebounce = <T,>(value: T, delay: number): [debouncedValue: T, isDebouncing: boolean] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  useEffect(
    () => {
      setIsDebouncing(true);
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setIsDebouncing(false);
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return [ debouncedValue, isDebouncing ];
};

export default useDebounce;