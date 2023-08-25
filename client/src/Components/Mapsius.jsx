import React from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const locations = [
  { id: 1, lat: -34.397, lng: 150.644, title: 'Sydney', description: 'A beautiful city' },
  { id: 2, lat: -33.8688, lng: 151.2093, title: 'Bondi Beach', description: 'Famous beach' },
  {
    id: 3, lat: -34.397,
    lng: 150.644, title: 'Bondi Junction', description: 'Shopping area'
  },
];

const Mapsius = () => {
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };
  const customMarkerIcon = {
    url: '../Media/icon.png'
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAXdHTGymivkmCqjTbiViYnqdUVw8Nhk5k">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => handleMarkerClick(location)}
            icon={customMarkerIcon}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapsius;