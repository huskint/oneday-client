import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';

import Layout from '../ui/components/layout/Layout';
import IconButton from '../ui/components/button/IconButton';
import SnowWeather from '../ui/lottie/snow-weather.json';
import useLockBodyScroll from '../lib/hooks/useLockBodyScroll';

const Home: NextPage = () => {
  useLockBodyScroll();

  return (
    <Layout>
      <BackgroundContainer>
        <Lottie
          animationData={SnowWeather}
          play
          style={{ width: '100%', height: '100%' }}
        />
      </BackgroundContainer>
      <ButtonContainer>
        <IconButton
          backgroundColor="#a2cbfd"
          icon={
            <img
              src="/images/icon/email.svg"
              alt="이메일 아이콘"
              width="20"
              height="20"
            />
          }
        >
          이메일로 로그인
        </IconButton>
        <IconButton
          backgroundColor="#f7e10e"
          icon={
            <img
              src="/images/icon/kakao.svg"
              alt="카카오톡 아이콘"
              width="15"
              height="15"
            />
          }
        >
          카카오톡 로그인
        </IconButton>
      </ButtonContainer>
    </Layout>
  );
};

export default Home;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > div {
    height: auto !important;
  }
`;

const ButtonContainer = styled.section`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  background-color: #5a8fcd;
  padding: 0px 24px 50px 24px;

  & > button + button {
    margin-top: 10px;
  }
`;
