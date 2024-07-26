import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  onClick: () => void;
}

const LastLocationButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='last-location'>
      <Button
        color='info'
        style={{
          width: '7vw',
          height: '2.5vw',
          border: '0.1vw solid hsl(220, 17%, 37%)',
          fontSize: '1vw',
          right: '120%',
          bottom: '6px',
          fontFamily: 'DevX32',
          backgroundColor: 'hsl(0, 0%, 13%)',
        }}
        variant='contained'
        onClick={onClick}
      >
        Last Location
      </Button>
    </div>
  );
};

export default LastLocationButton;