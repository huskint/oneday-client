import React, {
  ChangeEvent, useCallback, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Layout from '@components/layout/Layout';
import alert from '@components/alert/Alert';
import AuthContainer from '@components/form/auth/AuthContainer';
import { useStores } from '@lib/store/stores';

const Signup = () => {
  const router = useRouter();
  const { userStore } = useStores();

  const onChangeIsTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    userStore.isTerm = e.target.checked;
  }, []);

  const isDisabledSignUp = useMemo(() => !(
    userStore.userValidation.email
    && userStore.userValidation.password
    && userStore.userValidation.passwordCheck
    && userStore.userValidation.name
    && userStore.isTerm
  ), [userStore.userValidation, userStore.isTerm]);

  const handleClickPrev = useCallback(() => {
    router.back();
  }, []);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    userStore.onChangeSignUp(name, value);
  }, [userStore.user, userStore.userValidation]);

  const onClickSignUp = useCallback(async () => {
    const isSignUp = await userStore.signupUser();
    if (isSignUp) {
      await alert.congrats({
        title: '가입을 환영합니다.',
        desc: '어떤 하루를 기록해 보세요.',
      });
      router.push('/main/calendar');
      return;
    }
    alert.error({
      title: '회원가입에 실패했어요.',
      desc: '계속 문제가 발생하면 관리자에게 문의해 주세요.',
    });
  }, []);

  useEffect(() => {
    userStore.resetSignUser();
  }, []);

  return (
    <Layout>
      <Header>
        <Prev onClick={handleClickPrev}>
          <img src="/images/icon/back.svg" alt="뒤로가기 아이콘" />
        </Prev>
      </Header>
      <Heading>회원가입</Heading>
      <FormContainer>
        <AuthContainer
          label="이메일"
          id="email"
          type="email"
          value={userStore.signUser.email}
          validation={userStore.userValidation.email}
          onChange={onChangeUser}
          error={{
            isError: userStore.signUser.email.length > 0 && !userStore.userValidation.email,
            message: '이메일 형식이 올바르지 않습니다.',
          }}
        />
        <AuthContainer
          label="비밀번호"
          id="password"
          type="password"
          value={userStore.signUser.password}
          validation={userStore.userValidation.password}
          onChange={onChangeUser}
          error={{
            isError: userStore.signUser.password.length > 0 && !userStore.userValidation.password,
            message: '8글자 이상 입력해 주세요.',
          }}
        />
        <AuthContainer
          label="비밀번호 확인"
          id="passwordCheck"
          type="password"
          value={userStore.signUser.passwordCheck as string}
          validation={userStore.userValidation.passwordCheck}
          onChange={onChangeUser}
          error={{
            isError: (userStore.signUser.passwordCheck as string).length > 0 && !userStore.userValidation.passwordCheck,
            message: '비밀번호가 동일하지 않습니다.',
          }}
        />
        <AuthContainer
          label="닉네임"
          id="name"
          type="text"
          value={userStore.signUser.name as string}
          validation={userStore.userValidation.name}
          onChange={onChangeUser}
          error={{
            isError: (userStore.signUser.name as string).length > 0 && !userStore.userValidation.name,
            message: '닉네임 형식이 올바르지 않습니다.',
          }}
        />
        <SignUpCheckContainer>
          <Check>
            <CheckBoxLabel>
              <InputBox
                type="checkbox"
                checked={userStore.isTerm}
                onChange={onChangeIsTerm}
              />
            </CheckBoxLabel>
            <span>[필수] 개인정보 수집 및 이용 동의</span>
          </Check>
        </SignUpCheckContainer>

        <ButtonContainer>
          <SignUpButton
            disabled={isDisabledSignUp}
            onClick={onClickSignUp}
          >
            회원가입
          </SignUpButton>
        </ButtonContainer>
      </FormContainer>
    </Layout>
  );
};

export default observer(Signup);

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
  margin: 30px 0px 0px;
  text-align: center;
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 50px;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 40px;
`;

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
  height: 96px;

  & + & {
    margin-top: 25px;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  color: rgb(78, 89, 104);
  font-size: 17px;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input<{ isError?: boolean }>`
  width: 100%;
  height: 50px;
  border: 1px solid #e5e8eaff;
  border-radius: 8px;
  padding: 0 20px;
  outline: ${(props) => (props.isError && '0.5px solid #d21111')};
  background-color: ${(props) => (props.isError && '#fff2f5')};

  &:focus-visible {
    outline: ${(props) => (props.isError ? '0.5px solid #d21111' : '0.5px solid #a2cbfdba')};
  }
`;

const SignUpCheckContainer = styled.article`
  width: 100%;
  margin-top: 15px;
  display: flex;
  color: rgb(78, 89, 104);
  font-size: 14px;
`;

const Check = styled.span`
  height: 20px;
  flex-direction: row;
  margin-top: 20px;
  display: flex;
  align-items: stretch;
`;

const CheckBoxLabel = styled.label`
  width: 20px;
  height: 17px;
  margin: 0 5px 0 0;
`;

const InputBox = styled.input`
  width: 20px;
  height: 16px;
  margin: 0px;
  border: none;
  background: wheat;
`;

const ButtonContainer = styled.article`
  margin-top: 25px;
`;

const SignUpButton = styled.button`
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
