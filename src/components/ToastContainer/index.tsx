import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesAnaimation = useTransition(messages, message => message.id, {
    from: { right: '-120%', opacity: 0, transform: 'rotateZ(0deg)' },
    enter: { right: '0%', opacity: 1, transform: 'rotateZ(360deg)' },
    leave: { right: '-120%', opacity: 0, transform: 'rotateZ(0deg)' },
  });

  return (
    <Container>
      {messagesAnaimation.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
