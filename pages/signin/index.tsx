import React, {
  ChangeEvent, memo, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Layout from '../../ui/components/layout/Layout';
import getValidationUser from '../../lib/utils/getValidationUser';
import { requestPost } from '../../lib/api/client';
import alert from '../../ui/components/alert/Alert';

interface User {
  disabled: number;
  email: string;
  id: number;
  name: string;
  role: number;
  type: number;
  user_token: string;
}

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string, password: string }>({
    email: '',
    password: '',
  });

  const [userValidation, setUserValidation] = useState<{ email: boolean, password: boolean }>({
    email: false,
    password: false,
  });

  const isUserValidation = useMemo(() => (userValidation.email && userValidation.password) === false, [userValidation]);

  const handleClickPrev = () => {
    router.back();
  };

  const onChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexp = getValidationUser(name as 'email' | 'password' | 'name', value);

    setUser({
      ...user,
      [name]: value,
    });

    setUserValidation({
      ...userValidation,
      [name]: regexp,
    });
  };

  const onClickSignIn = async () => {
    try {
      const userInfo = await requestPost({
        url: '/user/signin',
        data: {
          email: user.email,
          password: user.password,
        },
      });
      const userData: User = userInfo.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      alert.success({
        title: '로그인에 실패했어요.',
        desc: '회원 정보가 올바르지 않아요.',
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
      <Heading>어떤 하루를 시작합니다.</Heading>
      <FormContainer>
        <InputContainer>
          <InputLabel>이메일</InputLabel>
          <Input name="email" value={user.email} onChange={onChangeUser} />
        </InputContainer>
        <InputContainer>
          <InputLabel>비밀번호</InputLabel>
          <Input name="password" value={user.password} onChange={onChangeUser} />
        </InputContainer>
        <ButtonContainer>
          <SignInButton
            disabled={isUserValidation}
            onClick={onClickSignIn}
          >
            로그인
          </SignInButton>
        </ButtonContainer>
      </FormContainer>
    </Layout>
  );
};

export default memo(Index);

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
