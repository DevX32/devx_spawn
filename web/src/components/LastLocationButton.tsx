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
                    width: '12.5rem',
                    height: '3.125rem',
                    border: '2px solid hsl(220, 17%, 37%)',
                    top: '10%',
                    left: '10%',
                    fontSize: '1.25rem',
                    fontFamily: 'DevX32',
                    background: 'hsl(0, 0%, 13%)',
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