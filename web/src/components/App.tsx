import React, { useState } from 'react';
import './App.css'
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";
import map from './images/map.png'
import { useEffect } from 'react';
import { fetchNui } from '../utils/fetchNui';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

// This will set the NUI to visible if we are developing in browser
debugData([{ action: 'setVisible', data: { visible: true } }]);

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
))(({ theme }) => ({
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

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showHidden, setShowHidden] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const [chosenData, setChosenData] = useState<SpawnInterface>({
    label: '',
    x: 0,
    y: 0,
    z: 0,
  });
  const [locations, setLocations] = useState<LocationsInterface[]>([
    {
      top: 670,
      left: 1085,
      label: 'Pier',
      spawns: [
        { label: 'Near Entrance', x: 100, y: 200, z: 0 },
        { label: 'Near Ferris Wheel', x: 120, y: 220, z: 0 },
      ],
    },
    {
      top: 612,
      left: 920,
      label: 'Richman Hotel',
      spawns: [
        { label: 'Lobby', x: 300, y: 400, z: 0 },
        { label: 'Poolside', x: 320, y: 420, z: 0 },
      ],
    },
    {
      top: 260,
      left: 530,
      label: 'Sandy Shores',
      spawns: [
        { label: 'Main Street', x: 500, y: 600, z: 0 },
        { label: 'Gas Station', x: 520, y: 620, z: 0 },
      ],
    },
    {
      top: 490,
      left: 230,
      label: 'Paleto Bay',
      spawns: [
        { label: 'Beach', x: 700, y: 800, z: 0 },
        { label: 'Town Center', x: 720, y: 820, z: 0 },
      ],
    },
    {
      top: 340,
      left: 1020,
      label: 'Mirror Park',
      spawns: [
        { label: 'Near Lake', x: 900, y: 1000, z: 0 },
        { label: 'Park Entrance', x: 920, y: 1020, z: 0 },
      ],
    },
  ]);

  useNuiEvent('setVisible', (data) => {
    setShow(data)
  })

  useNuiEvent('setLocations', (data) => {
    setLocations(data)
  })

  const spawnCharacter = (data: SpawnInterface) => {
    setVisible(false);
    fetchNui('spawnCharacter', data);
  };

  const cancel = () => {
    setVisible(false)
  }

  const lastLocation = () => {
    setChosenData({ label: 'Last Location', x: 0, y: 0, z: 0 })
    setVisible(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setHidden(false)
    }, 1000);
  }, [hidden])

  useEffect(() => {
    setTimeout(() => {
      setShowHidden(false)
    }, 1000);
  }, [showHidden])

  return (
    <div className={`nui-wrapper ${show}`} style={{ visibility: showHidden ? 'hidden' : 'visible' }}>
      <div className='devx32-text'>CHOOSE WHERE TO APPEAR</div>
      <div className='devx32-text2'>SPAWN SELECT</div>
      <div className='map-shell'>
        <div className='img-wrapper'>
          <img src={map} className='map'>
          </img>
        </div>
      </div>
      <div className='locations'>
      {locations && locations.map((location, key) => {
          return (
            <HtmlTooltip
              key={key}
              title={
                <React.Fragment>
                  <div className='tooltip-wrapper'>
                    <div className='tooltip-title'>{location.label}</div>
                    {location.spawns.map((spawn, index) => (
                      <div className='tooltip-button' key={index} onClick={() => { spawnCharacter(spawn) }}>
                        {spawn.label}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              }
            >
              <div className='location-pin' style={{ top: `${location.top}px`, left: `${location.left}px` }} />
            </HtmlTooltip>
          );
        })}
      </div>
      <div className={`decision-wrapper ${visible}`} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
        <div className='decision-title'>Are You Sure You Want To Spawn At</div>
        <div className='decision-desc'>{chosenData.label}</div>
        <div className='decision-button-wrapper'>
          <Button
            className='button'
            variant="contained"
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
            variant="contained"
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
        onClick={lastLocation}
      >
        Last Location
      </Button>
      </div>
    </div>
  );
}

export default App;