import {useEffect, useState} from 'react';

export const useTimer = (time: number, deps: any[] = []): [boolean] => {
  const [isTimeOver, setIsTimeOver] = useState<boolean>(false);
  useEffect(() => {
    const id = setTimeout(() => {
      setIsTimeOver(!isTimeOver);
    }, time);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [isTimeOver];
};
