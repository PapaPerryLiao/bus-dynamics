import { useState, useEffect, useRef } from "react";

const useDebounce = (sourceValue: any, delay: number) => {
  const timer = useRef(setTimeout(() => {}, 0));
  const [isDelay, setIsDelay] = useState(false);
  const [value, setValue] = useState(sourceValue);

  useEffect(() => {
    setIsDelay(true);

    timer.current = setTimeout(() => {
      setIsDelay(false);
      setValue(sourceValue);
    }, delay);

    return () => clearTimeout(timer.current);
  }, [sourceValue, delay]);

  return { value, isDelay };
};

export default useDebounce;
