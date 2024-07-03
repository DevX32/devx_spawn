import React, { useState, useEffect } from 'react';
import './styles.css';
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";
import map from './images/map.png';
import { fetchNui } from '../utils/fetchNui';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

debugData([{ action: 'setVisible', data: { visible: true } }]);

interface SpawnOption {
  label: string,
  x: number,
  y: number,
  z: number,
}

interface LocationsInterface {
  top: number,
  left: number,
  label: string,
  description: string,
  spawnOptions: SpawnOption[],
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
    padding: '0.625rem'
  },
}));

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showHidden, setShowHidden] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const [chosenData, setChosenData] = useState<SpawnOption>({
    label: '',
    x: 0,
    y: 0,
    z: 0,
  });

  const [locations, setLocations] = useState<LocationsInterface[]>([
    {
      top: 660,
      left: 1060,
      label: 'Pier',
      description: 'A beautiful pier with scenic views.',
      spawnOptions: [
        { label: 'Near Entrance', x: 100, y: 200, z: 0 },
        { label: 'Near Ferris Wheel', x: 120, y: 220, z: 0 }
      ]
    },
    {
      top: 612,
      left: 920,
      label: 'Richman Hotel',
      description: 'A luxurious hotel with all the amenities.',
      spawnOptions: [
        { label: 'Lobby', x: 300, y: 400, z: 0 },
        { label: 'Poolside', x: 320, y: 420, z: 0 }
      ]
    },
    {
      top: 280,
      left: 530,
      label: 'Sandy Shores',
      description: 'A quiet desert town with a small population.',
      spawnOptions: [
        { label: 'Main Street', x: 500, y: 600, z: 0 },
        { label: 'Gas Station', x: 520, y: 620, z: 0 }
      ]
    },
    {
      top: 490,
      left: 260,
      label: 'Paleto Bay',
      description: 'A coastal town with beautiful beaches.',
      spawnOptions: [
        { label: 'Beach', x: 700, y: 800, z: 0 },
        { label: 'Town Center', x: 720, y: 820, z: 0 }
      ]
    },
    {
      top: 360,
      left: 1000,
      label: 'Mirror Park',
      description: 'A trendy neighborhood with a great park.',
      spawnOptions: [
        { label: 'Near Lake', x: 900, y: 1000, z: 0 },
        { label: 'Park Entrance', x: 920, y: 1020, z: 0 }
      ]
    },
  ]);

  useNuiEvent('setVisible', (data) => {
    setShow(data);
  });

  useNuiEvent('setLocations', (data) => {
    setLocations(data);
  });

  const spawn = (data: SpawnOption) => {
    setVisible(false);
    fetchNui('spawnCharacter', data);
  };

  const cancel = () => {
    setVisible(false);
  };

  const lastLocation = () => {
    setChosenData({ label: 'Last Location', x: 0, y: 0, z: 0 });
    setVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 1000);
  }, [hidden]);

  useEffect(() => {
    setTimeout(() => {
      setShowHidden(false);
    }, 1000);
  }, [showHidden]);

  const [infoData, setInfoData] = useState({
    time: '10:00 AM',
    date: 'Sunday, Feb 18',
    weather: 'Sunny',
    temp: '49',
    wind: '2',
  });

  useNuiEvent('updateInfo', (data: any) => {
    setInfoData(data);
  });

  return (
    <div className={`nui-wrapper ${show}`} style={{ visibility: showHidden ? 'hidden' : 'visible' }}>
      <div className="devx32-text">CHOOSE WHERE TO APPEAR</div>
      <div className="devx32-text2">SPAWN SELECT</div>
      <div className='information'>
        <div className='infoRow'>
          <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill='white' viewBox="0 0 512 512">
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>
          <div className='infoColumn'>
            <div className='title'>{infoData.time}</div>
            <div className='desc'>{infoData.date}</div>
          </div>
        </div>
        <div className='infoRow'>
          <svg xmlns="http://www.w3.org/2000/svg" width='35' height='35' fill='white' viewBox="0 0 640 512">
            <path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" />
          </svg>
          <div className='infoColumn'>
            <div className='title'>{infoData.weather}</div>
            <div className='desc'>Current Weather</div>
          </div>
        </div>
        <div className='infoRow'>
          <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill='white' viewBox="0 0 512 512">
            <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
          </svg>
          <div className='infoColumn'>
            <div className='title'>{infoData.wind}m/s</div>
            <div className='desc'>Wind Speed</div>
          </div>
        </div>
        <div className='infoRow'>
          <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' fill='white' viewBox="0 0 320 512">
            <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z" />
          </svg>
          <div className='infoColumn'>
            <div className='title'>{infoData.temp} °C</div>
            <div className='desc'>Temperature</div>
          </div>
        </div>
      </div>
      <div className='map-shell'>
        <div className='img-wrapper'>
          <img src={map} className='map' alt='Map' />
        </div>
      </div>
      <div className='locations'>
        {locations && locations.map((data: LocationsInterface, key: number) => (
          <HtmlTooltip
            key={key}
            title={
              <React.Fragment>
                <div className='tooltip-wrapper'>
                  <div className='tt-title'>{data.label}</div>
                  <div className='tt-description'>{data.description}</div>
                  {data.spawnOptions.map((option, index) => (
                    <div key={index} className='tt-button' onClick={() => { spawn(option) }}>{option.label}</div>
                  ))}
                </div>
              </React.Fragment>
            }
          >
            <div className='location-pin' style={{ top: `${data.top}px`, left: `${data.left}px` }} />
          </HtmlTooltip>
        ))}
      </div>
      <div className={`decision-wrapper ${visible}`} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
        <div className='decision-desc'>Are You Sure You Want To Spawn At</div>
        <div className='decision-title'>{chosenData.label}</div>
        <div className='decision-button-wrapper'>
          <Button className='button' variant="contained" onClick={() => spawn(chosenData)} style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '0.938rem', color: 'hsl(206, 100%, 82.35%)', background: 'hsl(209.19, 41.57%, 17.45%)' }}>Spawn</Button>
          <Button className='button' variant="contained" onClick={cancel} style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '0.938rem', color: 'hsl(0, 0%, 100%)', background: 'hsl(230, 7.5%, 15.69%)' }}>Cancel</Button>
        </div>
      </div>
      <div className='last-location'><Button color="info" style={{ width: '12.5rem', height: '3.125rem', border: "0.125rem solid hsl(220, 17%, 37%)", fontSize: '1.25rem', fontFamily: "DEVX32", background: 'hsl(0, 0%, 13%)' }} variant="contained" onClick={lastLocation}>Last Location</Button></div>
    </div>
  );
}

export default App;