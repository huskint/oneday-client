import { useEffect } from 'react';

const useLockBodyScroll = () => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;

    const removeEvent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const disableScroll = () => {
      body.addEventListener('touchmove', removeEvent, { passive: false });
      body.addEventListener('onclick', removeEvent, { passive: false });
      body.addEventListener('mousewheel', removeEvent, { passive: false });
    };

    const enableScroll = () => {
      body.removeEventListener('touchmove', removeEvent);
      body.removeEventListener('onclick', removeEvent);
      body.removeEventListener('mousewheel', removeEvent);
    };

    disableScroll();

    return () => {
      enableScroll();
    };
  }, []);
};

export default useLockBodyScroll;
