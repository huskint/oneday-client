import React, {
  memo, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

interface Props {
  resolver: (resolve: boolean) => void;
  options: { [k: string]: any };
}

const AlertConfig = ({ resolver, options }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onAlertPopup = () => {
    setIsOpen(false);
    resolver(true);
  };

  const onCancelPopup = () => {
    setIsOpen(false);
    resolver(false);
  };

  const render = () => (
    <AlertLayout border={options?.border}>

      {
        options?.render
      }

      <ButtonContainer>
        {
          options?.labels?.cancel && (
            <ButtonCancel
              type="button"
              onClick={onCancelPopup}
            >
              {options?.labels?.cancel}
            </ButtonCancel>
          )
        }
        <ButtonSuccess
          type="button"
          onClick={onAlertPopup}
          ref={buttonRef}
        >
          {options?.labels?.success ? options?.labels?.success : '확인'}
        </ButtonSuccess>
      </ButtonContainer>
    </AlertLayout>
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      buttonRef?.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isOpen ? (
    <Container zIndex={options?.zIndex} isHiddenBackdrop={options?.isHiddenBackdrop}>
      {render()}
    </Container>
  ) : null;
};

export default memo(AlertConfig);

const Container = styled.div<{zIndex?: number; isHiddenBackdrop?: boolean;}>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => (props.isHiddenBackdrop ? 'transparent' : '#343a408f')};
  z-index: ${(props) => props.zIndex || 3001};
`;

const AlertLayout = styled.div<{border?: string;}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding: 30px 20px;
  width: 270px;
  height: auto;
  background: #fff;
  border: ${(props) => props.border || ''};
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h1 {
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: -0.03em;
    color: #343A40;
    white-space: pre-wrap;
  }

  p {
    font-size: 15px;
    line-height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: -0.03em;
    color: #343A40;
    margin: 10px 0 0 0;
    white-space: pre-wrap;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin: 30px 0 0 0;

  & > button + button {
    margin: 0 0 0 10px;
  }
`;

const ButtonCancel = styled.button`
  color: #ddd;
  background: #fff;
  border: unset;
  box-sizing: border-box;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  height: 48px;
  flex: 1 1 0;
`;

const ButtonSuccess = styled.button`
  color: #fff;
  background: #3182f6;
  border: 1px solid #3182f6;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  height: 48px;
  flex: 1 1 0;
  cursor: pointer;
`;
