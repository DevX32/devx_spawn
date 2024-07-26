import React from 'react';

interface Property {
  id: string;
  name: string;
  location: { x: number; y: number; z: number };
}

interface PropertySpawnerProps {
  properties: Property[];
  onSelect: (property: Property) => void;
}

const PropertySpawner: React.FC<PropertySpawnerProps> = ({ properties, onSelect }) => {
  return (
    <div className="property-spawner">
      <h2>Available Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id} onClick={() => onSelect(property)}>
            {property.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertySpawner;