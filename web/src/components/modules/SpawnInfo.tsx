import React from 'react';
import styled from 'styled-components';

interface SpawnInfoProps {
  text: string;
}

const Text = styled.div<{ isChooseWhere: boolean }>`
  position: absolute;
  font-family: 'DevX32';
  font-style: italic;
  z-index: 1;
  text-shadow: 0.125rem 0.125rem 0.25rem hsla(0, 0%, 0%, 0.5);
  color: ${(props) => (props.isChooseWhere ? 'var(--background-color)' : 'rgb(33, 33, 33)')};
  font-size: ${(props) => (props.isChooseWhere ? '1.6rem' : '3rem')};
  top: ${(props) => (props.isChooseWhere ? '6.2rem' : '3rem')};
  left: 16rem;
`;

const SpawnInfo: React.FC<SpawnInfoProps> = ({ text }) => {
  const isChooseWhere = text === 'CHOOSE WHERE TO APPEAR';
  return <Text isChooseWhere={isChooseWhere}>{text}</Text>;
};

export default SpawnInfo;