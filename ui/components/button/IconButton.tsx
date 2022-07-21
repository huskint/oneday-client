import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const IconButton = ({
  backgroundColor = 'pink',
  disabled = false,
  icon,
  children,
}: Props) => (
  <Container backgroundColor={backgroundColor} disabled={disabled}>
    {
      icon && (
        <IconContainer>
          {icon}
        </IconContainer>
      )
    }
    <span>{children}</span>
  </Container>
);

export default memo(IconButton);

const Container = styled.button<{ backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 54px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 8px;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #8cbffeba;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: grey;
  }
`;

const IconContainer = styled.span`
  margin-right: 5px;
  margin-top: 2px;
`;
