import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';

import Layout from '../ui/components/layout/Layout';
import IconButton from '../ui/components/button/IconButton';
import SnowWeaher from '../ui/lottie/snow-weather.json';

const Home: NextPage = () => (
  <Layout>
    <BackgroundContainer>
      <Lottie
        animationData={SnowWeaher}
        play
        style={{ width: '100%', height: '100%' }}
      />
    </BackgroundContainer>
    <ButtonContainer>
      <IconButton
        backgroundColor="#a2cbfdba"
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
            src="/images/icon/email.svg"
            alt="이메일 아이콘"
            width="20"
            height="20"
          />
        }
      >
        카카오톡 로그인
      </IconButton>
    </ButtonContainer>
  </Layout>
);

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
