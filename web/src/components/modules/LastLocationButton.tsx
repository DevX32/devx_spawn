import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  onClick: () => void;
}

const LastLocationButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='last-location'>
      <Button
        style={{
          width: '8rem',
          height: '3rem',
          border: '0.1rem solid hsl(220, 15%, 30%)',
          fontSize: '1.2rem',
          right: '120%',
          top: '3rem',
          fontFamily: 'DevX32',
          backgroundColor: 'hsl(210, 20%, 10%)',
          color: 'hsl(192, 16%, 94%)',
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