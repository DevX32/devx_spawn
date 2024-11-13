import React, { useEffect, useState } from 'react';
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
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (visible) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [visible]);

  const spawnCharacter = (data: any) => {
    setVisible(false);
    fetchNui('spawnCharacter', data);
  };

  const cancel = () => {
    setVisible(false);
  };

  return (
    <div className={`decision-wrapper ${visible}`} style={{ visibility: hidden ? 'hidden' : 'visible', backgroundColor: 'hsl(210, 20%, 10%)', padding: '1.77vh' }}>
      <div className='decision-title' style={{ fontFamily: 'Oswald', fontSize: '1.77vh', color: '#E0E0E0', textAlign: 'center' }}>
        Are You Sure You Want To Spawn At
      </div>
      <div className='decision-desc' style={{ fontFamily: 'Oswald', fontSize: '1.92vh', color: '#B0B0B0', textAlign: 'center' }}>
        {chosenData.label}
      </div>
      <div className='decision-button-wrapper'>
        <Button
          style={{
            fontFamily: 'Oswald',
            fontSize: '1.77vh',
            backgroundColor: 'hsl(210, 20%, 10%)',
            border: '0.14vh solid hsl(220, 15%, 30%)',
            borderRadius: '0.74vh',
            padding: '0.18vh 2.96vh',
          }}
          variant='contained'
          onClick={() => spawnCharacter(chosenData)}
        >
          Spawn
        </Button>
        <Button
          style={{
            fontFamily: 'Oswald',
            fontSize: '1.77vh',
            color: '#FF4040',
            backgroundColor: 'hsl(210, 20%, 10%)',
            border: '0.14vh solid hsl(220, 15%, 30%)',
            borderRadius: '0.74vh',
            padding: '0.18vh 2.96vh',
          }}
          variant='contained'
          onClick={cancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SpawnDecision;