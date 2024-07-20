import React, { useState, useEffect } from 'react';
import './App.css';
import { debugData } from '../utils/debugData';
import { fetchNui } from '../utils/fetchNui';
import { useNuiEvent } from '../hooks/useNuiEvent';
import SpawnInfo from './modules/SpawnInfo';
import MapComponent from './modules/MapComponent';
import LocationPins from './modules/LocationPins';
import SpawnDecision from './modules/SpawnDecision';
import LastLocationButton from './modules/LastLocationButton';
import InformationPanel from './modules/InformationPanel';

// This will set the NUI to visible if we are developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

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
    setShow(data.visible);
  });
  
  useNuiEvent('setLocations', (data) => {
    setLocations(data);
  });

  const lastLocation = () => {
    setChosenData({ label: 'Last Location', x: 0, y: 0, z: 0 });
    setVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHidden(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [infoData, setInfoData] = useState({
    time: '10:00 AM',
    date: 'Saturday, May 14',
    weather: 'Xmas',
    temp: '27',
    wind: '1',
  });

  return (
    <div className='nui-wrapper'>
      <SpawnInfo text="CHOOSE WHERE TO APPEAR" />
      <SpawnInfo text="SPAWN SELECT" />
      <InformationPanel {...infoData} />
      <MapComponent />
      <LocationPins locations={locations} />
      <SpawnDecision visible={visible} chosenData={chosenData} setVisible={setVisible} setChosenData={setChosenData} />
      <LastLocationButton onClick={lastLocation} />
    </div>
  );
};

export default App;