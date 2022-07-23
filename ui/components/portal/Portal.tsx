import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { mountRootId } from '../../../lib/utils/generateUniqueString';

interface Props {
  children: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const mount = document.getElementById(mountRootId) as HTMLElement;
  const el = document.createElement('div');

  useEffect(() => {
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
