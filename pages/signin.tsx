import React, {
  ChangeEvent, useMemo, KeyboardEvent, useCallback, useEffect,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

import getValidationUser from '@lib/utils/getValidationUser';
import alert from '@components/alert/Alert';
import AuthContainer from '@components/form/auth/AuthContainer';
import Layout from '@components/layout/Layout';
import { useStores } from '@lib/store/stores';

const SigninPage = () => {
  const router = useRouter();
  const { userStore } = useStores();

  const isUserValidation = useMemo(() => !(
    userStore.userValidation.email
    && userStore.userValidation.password
  ), [userStore.userValidation]);

  const handleClickPrev = useCallback(() => {
    router.back();
  }, []);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexp = getValidationUser(name as 'email' | 'password', value);

    userStore.signUser = ({
      ...userStore.signUser,
      [name]: value,
    });

    userStore.userValidation = ({
      ...userStore.userValidation,
      [name]: regexp,
    });
  }, [userStore.signUser, userStore.userValidation]);

  const onClickSignIn = useCallback(async () => {
    const isSignIn = await userStore.signinUser();
    if (isSignIn) {
      router.push('/main/calendar');
      return;
    }
    alert.error({
      title: '로그인에 실패했어요.',
      desc: '회원 정보가 올바르지 않아요.',
    });
  }, [userStore.user]);

  const handleClickSignUp = useCallback(() => {
    router.push('/signup');
  }, []);

  const onPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isUserValidation) {
      onClickSignIn();
    }
  }, [isUserValidation, onClickSignIn]);

  useEffect(() => {
    userStore.resetSignUp();
  }, []);

  return (
    <Layout>
      <Header>
        <Prev onClick={handleClickPrev}>
          <img src="/images/icon/back.svg" alt="뒤로가기 아이콘" />
        </Prev>
      </Header>
      <Heading>어떤 하루를 시작합니다.</Heading>
      <FormContainer>
        <AuthContainer
          label="이메일"
          id="email"
          type="email"
          value={userStore.signUser.email}
          onChange={onChangeUser}
        />
        <AuthContainer
          label="비밀번호"
          id="password"
          type="password"
          value={userStore.signUser.password}
          onChange={onChangeUser}
          onKeyPress={onPressEnter}
        />
        <ButtonContainer>
          <SignInButton
            disabled={isUserValidation}
            onClick={onClickSignIn}
          >
            로그인
          </SignInButton>
        </ButtonContainer>
        <SignUpContainer>회원이 아니신가요?
          <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
        </SignUpContainer>
      </FormContainer>
    </Layout>
  );
};

export default observer(SigninPage);

const Header = styled.header`
  width: 100%;
  height: 60px;
`;

const Prev = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    width: 30px;
    height: 30px;
  }
`;

const Heading = styled.div`
  font-size: 24px;
  color: rgb(78, 89, 104);
  margin: 60px 0px 0px;
  text-align: center;
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 80px;
  padding-right: 24px;
  padding-left: 24px;
`;

const InputContainer = styled.article`
  & + & {
    margin-top: 30px;
  }
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
  height: 50px;
  border: 1px solid rgb(229, 232, 234);
  border-radius: 8px;
  padding: 0 20px;

  &:focus-visible {
    outline: #a2cbfdba solid 0.5px;
  }
`;

const ButtonContainer = styled.article`
  margin-top: 32px;
`;

const SignInButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 54px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: #a2cbfd;
  transition: all 300ms;

  &:hover {
    cursor: pointer;
    background-color: #8ebef7;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #b2b2b280;
  }
`;

const SignUpContainer = styled.article`
  text-align: center;
  color: black;
  font-size: 14px;
`;

const SignUpButton = styled.button`
  border: none;
  background-color: #fff;
  margin-top: 60px;
  color: #4e61ff !important;
  cursor: pointer !important;
  text-decoration: underline;
  text-underline-position: under;
`;
