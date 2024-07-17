import React from 'react';
import Button from '@mui/material/Button';
import { fetchNui } from '../utils/fetchNui';

interface SpawnInterface {
  label: string;
  x: number;
  y: number;
  z: number;
}

interface SpawnDecisionProps {
  visible: boolean;
  chosenData: SpawnInterface;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenData: React.Dispatch<React.SetStateAction<SpawnInterface>>;
}

const SpawnDecision: React.FC<SpawnDecisionProps> = ({ visible, chosenData, setVisible, setChosenData }) => {
  const spawnCharacter = (data: SpawnInterface) => {
    setVisible(false);
    fetchNui('spawnCharacter', data);
  };

  const cancel = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className='decision-wrapper'>
          <div className='decision-title'>Are You Sure You Want To Spawn At</div>
          <div className='decision-desc'>{chosenData.label}</div>
          <div className='decision-button-wrapper'>
            <Button
              className='button'
              variant='contained'
              onClick={() => spawnCharacter(chosenData)}
              style={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '0.938rem',
                color: 'hsl(206, 100%, 82.35%)',
                background: 'hsl(209.19, 41.57%, 17.45%)',
              }}
            >
              Spawn
            </Button>
            <Button
              className='button'
              variant='contained'
              onClick={cancel}
              style={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '0.938rem',
                color: 'hsl(0, 0%, 100%)',
                background: 'hsl(230, 7.5%, 15.69%)',
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpawnDecision;