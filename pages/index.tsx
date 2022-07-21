import type { NextPage } from 'next';
import styled from 'styled-components';
import React from 'react';

import Layout from '../ui/components/layout/Layout';
import IconButton from '../ui/components/button/IconButton';

const Home: NextPage = () => (
  <Layout>
    hello
    <ButtonContainer>
      <IconButton
        icon={
          <img
            src="/images/icon/email.svg"
            alt="이메일 아이콘"
            width="20"
            height="20"
          />
        }
      >
        이메일로 가입하기
      </IconButton>
    </ButtonContainer>
  </Layout>
);

export default Home;

const ButtonContainer = styled.section`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  background-color: #ddd;
  padding: 0px 24px;
`;
