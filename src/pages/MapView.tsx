import React from 'react';
import Layout from '@/components/Layout';
import LeafletMap from '@/components/LeafletMap';

const MapView: React.FC = () => {
  return (
    <Layout isMapView>
      <div className="h-full w-full">
        <LeafletMap />
      </div>
    </Layout>
  );
};

export default MapView;