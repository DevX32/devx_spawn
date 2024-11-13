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
          width: '13.66vh',
          height: '4.44vh',
          border: '0.14vh solid hsl(220, 15%, 30%)',
          fontSize: '1.77vh',
          top: '4.44vh',
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