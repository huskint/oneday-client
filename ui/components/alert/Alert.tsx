import React from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'react-lottie-player';

import AlertContainer from './AlertConfig';
import Portal from '../portal/Portal';
import Success from '../../lottie/alert-success.json';
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
        <div style={{ marginTop: 20 }}>
          {message.title}
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

export default Alert;
