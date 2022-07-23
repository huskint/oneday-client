import { useEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

const useWindowSize = (): Size => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const calcSize = (): void => {
    const { innerWidth, innerHeight } = window;
    setSize({
      width: innerWidth,
      height: innerHeight,
    });
  };

  useEffect(() => {
    calcSize();
    window.addEventListener('resize', calcSize);
  }, []);

  return size;
};

export default useWindowSize;
