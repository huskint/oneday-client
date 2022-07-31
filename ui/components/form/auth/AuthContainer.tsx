import React, { ChangeEvent, memo, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  id: string;
  type: 'email' | 'password' | 'text';
  value: string;
  validation?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: {
    isError: boolean;
    message: string;
  };
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const AuthContainer = ({
  label,
  id,
  type = 'text',
  value,
  validation,
  onChange,
  error,
  onKeyPress,
}: Props) => (
  <Container>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        isError={error?.isError}
        onKeyPress={onKeyPress}
    />
    {value.length > 0 && !validation && <ErrorMsg>{error?.message}</ErrorMsg>}
  </Container>
);

export default memo(AuthContainer);

const Container = styled.article`
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
