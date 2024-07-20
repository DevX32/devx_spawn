import React from 'react';
import Button from '@mui/material/Button';
import { fetchNui } from '../../utils/fetchNui';
import '../styles/modules.css';

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
  const spawnCharacter = async (data: SpawnInterface) => {
    try {
      await fetchNui('spawnCharacter', data);
    } catch (error) {
      console.error('Failed to spawn character:', error);
    } finally {
      setVisible(false);
    }
  };

  const cancel = () => {
    setVisible(false);
  };

  return (
    <div className={`decision-wrapper ${visible ? 'visible' : 'hidden'}`}>
      <div className='decision-title'>Are You Sure You Want To Spawn At</div>
      <div className='decision-desc'>{chosenData.label}</div>
      <div className='decision-button-wrapper'>
        <Button
          className='button spawn-button'
          variant='contained'
          color='primary'
          onClick={() => spawnCharacter(chosenData)}
        >
          Spawn
        </Button>
        <Button
          className='button cancel-button'
          variant='outlined'
          color='secondary'
          onClick={cancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SpawnDecision;