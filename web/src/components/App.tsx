import React, { useState, useEffect } from 'react';
import './App.css';
import { debugData } from '../utils/debugData';
import { useNuiEvent } from '../hooks/useNuiEvent';
import SpawnInfo from './modules/SpawnInfo';
import MapComponent from './modules/MapComponent';
import LocationPins from './modules/LocationPins';
import SpawnDecision from './modules/SpawnDecision';
import LastLocationButton from './modules/LastLocationButton';
import InformationPanel from './modules/InformationPanel';
import PropertySpawner from './modules/PropertySpawner';

debugData([{ action: 'setVisible', data: true }]);

interface LocationsInterface {
  top: number;
  left: number;
  label: string;
}

interface Property {
  id: string;
  name: string;
  location: { x: number; y: number; z: number };
}

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showHidden, setShowHidden] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const [chosenData, setChosenData] = useState({ label: '', x: 0, y: 0, z: 0 });
  const [infoData, setInfoData] = useState({
    time: '10:00 AM',
    date: 'Saturday, May 14',
    weather: 'Xmas',
    temp: '27',
    wind: '1',
  });
  const [locations, setLocations] = useState<LocationsInterface[]>([
    { top: 670, left: 1085, label: 'Pier' },
    { top: 612, left: 920, label: 'Richman Hotel' },
    { top: 260, left: 530, label: 'Sandy Shores' },
    { top: 490, left: 230, label: 'Paleto Bay' },
    { top: 340, left: 1020, label: 'Mirror Park' },
  ]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useNuiEvent('setVisible', (data) => setShow(data.visible));
  useNuiEvent('setLocations', (data) => setLocations(data));
  useNuiEvent('updateInfo', (data) => setInfoData(data));
  useNuiEvent('setProperties', (data) => setProperties(data));
  useNuiEvent('spawnProperty', (property) => setSelectedProperty(property));

  const lastLocation = () => {
    setChosenData({ label: 'Last Location', x: 0, y: 0, z: 0 });
    setVisible(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHidden(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setVisible(true);
  };

  return (
    <div className='nui-wrapper'>
      <SpawnInfo text="CHOOSE WHERE TO APPEAR" />
      <SpawnInfo text="SPAWN SELECT" />
      <InformationPanel {...infoData} />
      <MapComponent />
      <LocationPins locations={locations} />
      <PropertySpawner properties={properties} onSelect={handlePropertySelect} />
      <SpawnDecision
        visible={visible}
        chosenData={chosenData}
        setVisible={setVisible}
        setChosenData={setChosenData}
      />
      <LastLocationButton onClick={lastLocation} />
    </div>
  );
};

export default App;
