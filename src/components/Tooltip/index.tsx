import React from 'react';

import { Container } from './styles';

interface PropsTooltip {
  title: string;
  className?: string;
}

const Tooltip: React.FC<PropsTooltip> = ({ className, children, title }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
