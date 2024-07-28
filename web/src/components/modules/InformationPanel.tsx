import React from 'react';
import styled from 'styled-components';

interface InformationProps {
  time: string;
  date: string;
  weather: string;
  temp: string;
  wind: string;
}

interface InfoRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InformationContainer = styled.div`
  position: absolute;
  bottom: 7rem;
  left: 16rem;
  width: 220px;
  height: 220px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  border-radius: 3px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  font-size: 15px;
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const Description = styled.div`
  opacity: 0.8;
  font-size: 14px;
  color: var(--secondary-text-color);
`;

const InfoRow: React.FC<InfoRowProps> = ({ icon, title, description }) => (
  <InfoRowContainer>
    <IconWrapper aria-label={description}>{icon}</IconWrapper>
    <div>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </div>
  </InfoRowContainer>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
    <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
  </svg>
);

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
    <path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" />
  </svg>
);

const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
    <path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
  </svg>
);

const ThermometerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
    <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z" />
  </svg>
);

const InformationPanel: React.FC<InformationProps> = ({ time, date, weather, temp, wind }) => (
  <InformationContainer>
    <InfoRow
      icon={<ClockIcon />}
      title={time}
      description={date}
    />
    <InfoRow
      icon={<CloudIcon />}
      title={weather}
      description="Current Weather"
    />
    <InfoRow
      icon={<WindIcon />}
      title={`${wind} m/s`}
      description="Wind Speed"
    />
    <InfoRow
      icon={<ThermometerIcon />}
      title={`${temp} °C`}
      description="Temperature"
    />
  </InformationContainer>
);

export default InformationPanel;