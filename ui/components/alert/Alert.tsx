import React from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';

import AlertContainer from './AlertConfig';
import Portal from '../portal/Portal';
import Success from '../../lottie/alert-success.json';
import Error from '../../lottie/alert-error.json';
import Congrats from '../../lottie/alert-congrats.json';
import { mountRootId } from '../../../lib/utils/generateUniqueString';

const Alert = async (options: any): Promise<boolean> => {
  const mount = await document.getElementById(mountRootId);
  if (!mount) {
    const rootMount = await document.createElement('div');
    await rootMount.setAttribute('id', mountRootId);
    document.body.appendChild(rootMount);
  }

  return new Promise((resolve) => {
    const AlertContainerEl = React.createElement(AlertContainer, {
      resolver: resolve,
      options,
    });
    const PortalEl = React.createElement(Portal, null, AlertContainerEl);
    ReactDOM.render(PortalEl, document.getElementById(mountRootId));
  });
};

Alert.success = async (message: { title?: string; desc?: string; }) => {
  const options = {
    render: (
      <>
        <Lottie
          animationData={Success}
          play
          speed={0.8}
          style={{ width: 100, height: 100 }}
        />
        <div>
          <MessageHeading>{message.title}</MessageHeading>
          <MessageDescription>{message.desc}</MessageDescription>
        </div>
      </>
    ),
    labels: {
      success: '확인했어요',
    },
  };
  const result = await Alert(options);
  return result;
};

Alert.error = async (message: { title?: string; desc?: string; }) => {
  const options = {
    render: (
      <>
        <Lottie
          animationData={Error}
          play
          speed={0.8}
          style={{ width: 120, height: 120 }}
        />
        <div>
          <MessageHeading>{message.title}</MessageHeading>
          <MessageDescription>{message.desc}</MessageDescription>
        </div>
      </>
    ),
    labels: {
      success: '확인했어요',
    },
  };
  const result = await Alert(options);
  return result;
};

Alert.congrats = async (message: { title?: string; desc?: string; }) => {
  const options = {
    render: (
      <>
        <Lottie
            animationData={Congrats}
            play
            speed={1.2}
            style={{ width: 180, height: 180, marginTop: '-30px' }}
        />
        <div style={{ marginTop: '-15px' }}>
          <MessageHeading>{message.title}</MessageHeading>
          <MessageDescription>{message.desc}</MessageDescription>
        </div>
      </>
    ),
    labels: {
      success: '확인했어요.',
    },
  };
  const result = await Alert(options);
  return result;
};

export default Alert;

const MessageHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: #4e5968;
  margin: 10px 0px 0px;
`;

const MessageDescription = styled.p`
  font-size: 15px;
  text-align: center;
  line-height: 23px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: #343a40;
  margin: 10px 0px 0px;
  white-space: pre-wrap;
`;
