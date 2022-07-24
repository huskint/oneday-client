import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  backgroundColor?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

const IconButton = ({
  backgroundColor = '#f4f4f4',
  disabled = false,
  icon,
  onClick,
  children,
}: Props) => (
  <Container
    backgroundColor={backgroundColor}
    disabled={disabled}
    onClick={onClick}
  >
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
  background-color: ${(props) => `${props.backgroundColor}ba`};
  border-radius: 8px;
  border: none;
  transition: all 300ms;
  
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.backgroundColor};
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
