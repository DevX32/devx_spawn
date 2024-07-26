import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { fetchNui } from '../../utils/fetchNui';

interface LocationsInterface {
  top: number;
  left: number;
  label: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#212121',
    border: '0.125rem solid hsl(220, 17%, 37%)',
    borderRadius: '0.125rem',
    color: 'hsl(0, 0%, 100%)',
    maxWidth: 220,
    fontSize: '0.875rem',
    padding: '0.625rem',
  },
}));

interface LocationPinsProps {
  locations: LocationsInterface[];
}

const LocationPins: React.FC<LocationPinsProps> = ({ locations }) => {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

  const handleTooltipOpen = (index: number) => {
    setOpenTooltipIndex(index);
  };

  const handleTooltipClose = () => {
    setOpenTooltipIndex(null);
  };

  const spawnCharacter = async (data: any) => {
    try {
      await fetchNui('spawnCharacter', data);
      handleTooltipClose();
    } catch (error) {
      console.error('Failed to spawn character:', error);
    }
  };

  return (
    <div className='locations'>
      {locations && locations.map((data, key) => (
        <HtmlTooltip
          key={key}
          open={openTooltipIndex === key}
          onClose={handleTooltipClose}
          onOpen={() => handleTooltipOpen(key)}
          title={
            <React.Fragment>
              <div className='tooltip-wrapper'>
                <div className='tooltip-title'>{data.label}</div>
                  <div 
                    className='tooltip-button' 
                    onClick={() => {
                      spawnCharacter(data);
                      handleTooltipClose();
                    }}
                  >
                    Spawn
                  </div>
              </div>
            </React.Fragment>
          }
        >
          <div 
            className='location-pin' 
            style={{ top: `${data.top}px`, left: `${data.left}px` }} 
          />
        </HtmlTooltip>
      ))}
    </div>
  );
};

export default LocationPins;