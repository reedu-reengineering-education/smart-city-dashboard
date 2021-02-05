import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useMap } from 'react-leaflet';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

// @ts-ignore
const mcg = L.markerClusterGroup();

// @ts-ignore
const MarkerCluster = ({ markers }) => {
  // @ts-ignore
  const map = useMap();

  useEffect(() => {
    mcg.clearLayers();
    if (markers?.length > 0) {
      // @ts-ignore
      markers.forEach(({ position, text, html }) => {
        const customMarker = L.divIcon({
          html: renderToStaticMarkup(html),
          iconAnchor: [18, 30],
        });

        return L.marker(new L.LatLng(position[1], position[0]), {
          icon: customMarker,
        })
          .addTo(mcg)
          .bindPopup(text);
      });
    }

    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
