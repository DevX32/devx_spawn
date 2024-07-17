import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { fetchNui } from '../utils/fetchNui';

interface SpawnInterface {
  label: string;
  x: number;
  y: number;
  z: number;
}

interface LocationsInterface {
  top: number;
  left: number;
  label: string;
  spawns: SpawnInterface[];
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
  const spawnCharacter = (data: SpawnInterface) => {
    fetchNui('spawnCharacter', data);
  };

  return (
    <div className='locations'>
      {locations.map((location, key) => (
        <HtmlTooltip
          key={key}
          title={
            <div className='tooltip-wrapper'>
              <div className='tooltip-title'>{location.label}</div>
              {location.spawns.map((spawn, index) => (
                <div className='tooltip-button' key={index} onClick={() => spawnCharacter(spawn)}>
                  {spawn.label}
                </div>
              ))}
            </div>
          }
        >
          <div className='location-pin' style={{ top: `${location.top}px`, left: `${location.left}px` }} />
        </HtmlTooltip>
      ))}
    </div>
  );
};

export default LocationPins;