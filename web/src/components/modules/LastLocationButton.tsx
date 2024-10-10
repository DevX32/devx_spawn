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
          width: '8rem',
          height: '3rem',
          border: '0.1rem solid hsl(220, 17%, 37%)',
          fontSize: '1.2rem',
          right: '120%',
          top: '3rem',
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