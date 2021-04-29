import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Marker, Popup } from 'react-leaflet';
import { CarParking } from '../Icons';

import MapMarker from './MapMarker';
import TimeSeriesChart from '../TimeSeriesChart';
import { PopupContent } from './styles';

const MapCarParkComponent = () => {
  const parkhausData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.parkhaus
  );

  const parkhausTimeline: {
    data: any[];
    metadata: any;
  } = useSelector((state: RootStateOrAny) => state.parkhaus.dataTimeline);

  const [chartData, setChartData] = useState<
    { name: any; data: { x: Date; y: any }[] }[]
  >();

  useEffect(() => {
    if (parkhausTimeline?.data?.length > 0) {
      const filtered = parkhausTimeline?.data?.filter((pht) => pht != null);

      // eslint-disable-next-line
      const times = filtered.map((ph) => {
        if (ph?.timestamp) return ph.timestamp;
      });

      const parkingSpots = Object.keys(filtered[0]).filter(
        (p) => p !== 'timestamp' && p !== 'Datum und Uhrzeit'
      );

      const myChartData = parkingSpots.map((p: any) => {
        const data = times.map((t) => ({
          x: new Date(t),
          y: filtered.find((pht) => pht.timestamp === t)[p],
        }));

        return {
          name: p.replace('PH ', '').replace('PP ', ''),
          data,
        };
      });

      setChartData(myChartData);
    }
  }, [parkhausTimeline]);

  return (
    <>
      {parkhausData?.data?.features?.length > 0 &&
        parkhausData.data.features.map((carPark: any) => (
          <Marker
            key={carPark.properties.LFDNR}
            position={carPark.geometry.coordinates.reverse()}
            icon={L.divIcon({
              className: '',
              html: renderToStaticMarkup(
                <MapMarker
                  color="blue"
                  icon={<CarParking fill="#fff" />}
                  title={carPark.properties.NAME}
                  details={`${carPark.properties.parkingFree} frei`}
                ></MapMarker>
              ),
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          >
            <Popup closeButton={false}>
              <PopupContent>
                {chartData && (
                  <TimeSeriesChart
                    id={carPark.properties.NAME}
                    series={chartData.filter(
                      (c) =>
                        c.name ===
                        carPark.properties.NAME.replace('Parkhaus ', '')
                          .replace('Parkplatz ', '')
                          .replace('PH ', '')
                          .replace('Münster-Arkaden', 'Münster Arkaden')
                          .replace('Hörster Platz', 'Hörsterplatz')
                    )}
                    title="Parkplatzbelegung gestern"
                    type={'line'}
                    height={200}
                    width={250}
                    chartOptions={{
                      chart: {
                        redrawOnWindowResize: true,
                      },
                      colors: ['#009fe3'],
                      yaxis: {
                        labels: {
                          formatter: (value: number) => {
                            if (!value) return '';
                            return value.toFixed(0);
                          },
                        },
                      },
                      tooltip: {
                        x: {
                          show: false,
                          formatter: (value: number) => {
                            if (!value) return '';
                            const date = new Date(value);
                            return `${date.toLocaleString()} Uhr`;
                          },
                        },
                        y: {
                          formatter: (value: number) => {
                            if (!value) return '';
                            return `${value.toFixed(0)}`;
                          },
                        },
                      },
                    }}
                  ></TimeSeriesChart>
                )}
              </PopupContent>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default MapCarParkComponent;
