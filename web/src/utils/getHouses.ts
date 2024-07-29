export interface Property {
  id: string;
  name: string;
  location: { x: number; y: number; z: number };
}

interface HouseData {
  id: string;
  name: string;
  location: { x: number; y: number; z: number };
}

const transformHouseDataToProperty = (houseData: HouseData[]): Property[] => {
  return houseData.map(house => ({
    id: house.id,
    name: house.name,
    location: house.location
  }));
};

export const getHouses = async (): Promise<Property[]> => {
  try {
    const response = await fetch('https://devx_spawn/devx_spawn:server:getProperty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: HouseData[] = await response.json();
    return transformHouseDataToProperty(data);
  } catch (error) {
    console.error('Error fetching house data:', error);
    throw error;
  }
};