import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { updateMapViewport } from '../actions/map';

function Map() {
  const viewport = useSelector((state: RootStateOrAny) => state.map.viewport);
  // const bbox = useSelector((state: RootStateOrAny) => state.map.bbox);
  const dispatch = useDispatch();

  const rasterStyle = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://geo.stadt-muenster.de/basiskarte/{z}/{x}/{y}.png'],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 18,
      },
    ],
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={rasterStyle}
      width="100%"
      height="calc(100% - 64px)" // 100% minus navbar height
      onViewportChange={(nextViewport: any) => {
        dispatch(updateMapViewport(nextViewport));
      }}
    />
  );
}

export default Map;
