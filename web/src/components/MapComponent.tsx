import React from 'react';
import map from './assets/map.png';

const MapComponent: React.FC = () => {
  return (
    <div className='map-shell'>
      <div className='img-wrapper'>
        <img src={map} className='map' alt='Map' />
      </div>
    </div>
  );
};

export default MapComponent;