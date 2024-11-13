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
  text-shadow: 0.185vh 0.185vh 0.37vh hsla(0, 0%, 0%, 0.5);
  color: ${(props) => (props.isChooseWhere ? 'var(--background-color)' : 'var(--background-color)')};
  font-size: ${(props) => (props.isChooseWhere ? '2.37vh' : '4.44vh')};
  top: ${(props) => (props.isChooseWhere ? '14vh' : '9vh')};
  left: 25.70vh;
`;

const SpawnInfo: React.FC<SpawnInfoProps> = ({ text }) => {
  const isChooseWhere = text === 'CHOOSE WHERE TO APPEAR';
  return <Text isChooseWhere={isChooseWhere}>{text}</Text>;
};

export default SpawnInfo;