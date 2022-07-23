import React, { memo, useEffect } from 'react';
import styled from 'styled-components';

import Page from './Page';
import useWindowSize from '../../../lib/hooks/useWindowSize';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { height } = useWindowSize();

  const setScreenSize = () => {
    const vh = height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  }, [height]);

  return (
    <Page>
      <Container>
        {children}
      </Container>
    </Page>
  );
};

export default memo(Layout);

const Container = styled.main`
  position: absolute;
  width: 100vw;
  max-width: 420px;
  height: calc(var(--vh, 1vh) * 100);
  max-height: 920px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
