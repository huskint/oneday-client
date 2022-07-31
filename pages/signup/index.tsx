import React, { ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '../../ui/components/layout/Layout';
import alert from '../../ui/components/alert/Alert';
import getValidationUser from '../../lib/utils/getValidationUser';
import { requestPost } from '../../lib/api/client';

interface User {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

interface UserValidation {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  name: boolean;
}

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  });

  const [userValidation, setUserValidation] = useState<UserValidation>({
    email: false,
    password: false,
    passwordCheck: false,
    name: false,
  });

  const isUserValidation = useMemo(() => (userValidation.email && userValidation.password && userValidation.passwordCheck && userValidation.name) === false, [userValidation]);

  const handleClickPrev = () => {
    router.back();
  };

  const onChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexpCheckList = ['email', 'password', 'name'];
    let test: boolean = false;
    if (regexpCheckList.includes(name)) {
      test = getValidationUser(name as 'email' | 'password' | 'name', value);
    }
    if (name === 'passwordCheck') {
      test = user.password === value;
    }

    setUser({
      ...user,
      [name]: value,
    });

    setUserValidation({
      ...userValidation,
      [name]: test,
    });
  };

  const onClickSignUp = async () => {
    try {
      const userInfo = await requestPost({
        url: '/user/signup',
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
      });
      const userData: User = userInfo.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      await alert.congrats({
        title: '가입을 환영합니다.',
        desc: '어떤 하루를 기록해 보세요.',
      });
      router.push('/main/calendar');
    } catch (e) {
      alert.error({
        title: '회원가입에 실패했어요.',
        desc: '계속 문제가 발생하면 관리자에게 문의해 주세요.',
      });
    }
  };

  return (
    <Layout>
      <Header>
        <Prev onClick={handleClickPrev}>
          <img src="/images/icon/back.svg" alt="뒤로가기 아이콘" />
        </Prev>
      </Header>
      <Heading>회원가입</Heading>
      <FormContainer>
        <InputContainer>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={onChangeUser}
            isError={user.email.length > 0 && !userValidation.email}
          />
          {user.email.length > 0 && !userValidation.email && <ErrorMsg>이메일 형식이 올바르지 않습니다.</ErrorMsg>}
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={onChangeUser}
            isError={user.password.length > 0 && !userValidation.password}
          />
          {user.password.length > 0 && !userValidation.password && <ErrorMsg>8글자 이상 입력해 주세요.</ErrorMsg>}
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="passwordCheck">비밀번호 확인</InputLabel>
          <Input
            id="passwordCheck"
            name="passwordCheck"
            type="password"
            value={user.passwordCheck}
            onChange={onChangeUser}
            isError={user.passwordCheck.length > 0 && !userValidation.passwordCheck}
          />
          {user.passwordCheck.length > 0 && !userValidation.passwordCheck && <ErrorMsg>비밀번호가 동일하지 않습니다.</ErrorMsg>}
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="name">닉네임</InputLabel>
          <Input
            id="name"
            name="name"
            value={user.name}
            onChange={onChangeUser}
            isError={user.name.length > 0 && !userValidation.name}
          />
          {user.name.length > 0 && !userValidation.name && <ErrorMsg>닉네임 형식이 올바르지 않습니다.</ErrorMsg>}
        </InputContainer>

        <SignUpCheckContainer>
          <Check>
            <CheckBoxLabel>
              <InputBox type="checkbox" />
            </CheckBoxLabel>
            <span>[필수] 개인정보 수집 및 이용 동의</span>
          </Check>
        </SignUpCheckContainer>

        <ButtonContainer>
          <SignUpButton
            disabled={isUserValidation}
            onClick={onClickSignUp}
          >
            회원가입
          </SignUpButton>
        </ButtonContainer>
      </FormContainer>
    </Layout>
  );
};

export default Index;

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

const ErrorMsg = styled.span`
  margin-top: 7px;
  padding-left: 4px;
  font-size: 12px;
  color: #d21111;
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
