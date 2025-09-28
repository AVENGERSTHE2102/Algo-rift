import React, { useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { mockArgoFloats } from '@/lib/mockData';
import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';
import FloatPopup from './FloatPopup';
import { renderToStaticMarkup } from 'react-dom/server';

const createCustomIcon = (status: 'active' | 'inactive' | 'maintenance') => {
  return L.divIcon({
    html: `<div class="custom-div-icon-${status}"><div class="custom-div-icon-inner"></div></div>`,
    className: 'custom-div-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

const LeafletMap: React.FC = () => {
  const activeIcon = useMemo(() => createCustomIcon('active'), []);
  const maintenanceIcon = useMemo(() => createCustomIcon('maintenance'), []);
  const inactiveIcon = useMemo(() => createCustomIcon('inactive'), []);

  const geoJsonData = useMemo(() => ({
    type: 'FeatureCollection',
    features: mockArgoFloats.map(float => ({
      type: 'Feature',
      properties: float,
      geometry: {
        type: 'Point',
        coordinates: [float.longitude, float.latitude]
      }
    }))
  }), []);

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties) {
      const popupContent = renderToStaticMarkup(<FloatPopup float={feature.properties} />);
      layer.bindPopup(popupContent);

      layer.on({
        mouseover: () => layer.openPopup(),
        mouseout: () => layer.closePopup()
      });
    }
  };

  const pointToLayer = (feature: any, latlng: L.LatLng) => {
    const { status } = feature.properties;
    const icon = status === 'active' ? activeIcon : status === 'maintenance' ? maintenanceIcon : inactiveIcon;
    return L.marker(latlng, { icon });
  };

  return (
    <MapContainer center={[12.0, 80.0]} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} pointToLayer={pointToLayer} />
    </MapContainer>
  );
};

export default LeafletMap;
