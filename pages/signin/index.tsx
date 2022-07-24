import React from 'react';
import styled from 'styled-components';

import Layout from '../../ui/components/layout/Layout';

const Index = (props) => (
  <Layout>
    <Header>
      dd
    </Header>
    <Heading>어떤 하루를 시작합니다.</Heading>
    <FormContainer>
      <InputContainer>
        <InputLabel>이메일</InputLabel>
        <Input />
      </InputContainer>
      <InputContainer>
        <InputLabel>비밀번호</InputLabel>
        <Input />
      </InputContainer>
    </FormContainer>
  </Layout>

);

export default Index;

const Header = styled.header`
  width: 100%;
  height: 40px;
  background-color: #f4f4f4;
`;

const Heading = styled.div`
  background-color: gray;
  font-size: 24px;
  color: rgb(78, 89, 104);
  margin: 40px 0px 0px;
  text-align: center;
`;

const FormContainer = styled.section`
  position: relative;
  width: 100%;
  height: 80%;
  padding: 100px 24px;
  display: flex;
  flex-direction: column;
  background-color: wheat;
`;

const InputContainer = styled.section`
  //margin-top: 30px;
  padding: 30px 24px 0px 24px;
`;

const InputLabel = styled.label`
  width: 100%;
  color: rgb(78, 89, 104);
  font-size: 17px;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid rgb(229, 232, 234);
  border-radius: 8px;
`;
