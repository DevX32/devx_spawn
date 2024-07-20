import React from 'react';

interface SpawnInfoProps {
  text: string;
}

const SpawnInfo: React.FC<SpawnInfoProps> = ({ text }) => {
  const textStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily: 'DevX32',
    fontStyle: 'italic',
    zIndex: 10,
    textShadow: '0.125rem 0.125rem 0.25rem hsla(0, 0%, 0%, 0.5)',
    color: text === 'CHOOSE WHERE TO APPEAR' ? 'var(--background-color)' : 'rgb(33, 33, 33)',
    fontSize: text === 'CHOOSE WHERE TO APPEAR' ? '1.5vw' : '3vw',
    top: text === 'CHOOSE WHERE TO APPEAR' ? '4vw' : '5vw',
    left: text === 'CHOOSE WHERE TO APPEAR' ? '13vw' : '13vw',
  };

  return <div style={textStyle}>{text}</div>;
};

export default SpawnInfo;