import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MeasurementTile } from './MeasurementTile';
import { ComponentWrapper } from './styles';

import Chart from 'react-apexcharts';

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > div[type='area'] {
    width: 100% !important;
  }
`;

export const OpenSenseMapComponent = () => {
  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    if (opensensemapData.data.live.sensors?.length > 0) {
      setTemperature(
        opensensemapData.data.live.sensors[0].lastMeasurement.value
      );
      setHumidity(opensensemapData.data.live.sensors[1].lastMeasurement.value);
      setPressure(opensensemapData.data.live.sensors[2].lastMeasurement.value);
    }
  }, [opensensemapData]);

  return (
    <ComponentWrapper style={{ display: 'flex', flexDirection: 'column' }}>
      <HeadingWrapper>
        <p className="is-size-5">Wetter senseBox</p>
      </HeadingWrapper>
      <TilesWrapper>
        <MeasurementTile
          header="Temperatur"
          value={temperature}
          footer="in °C"
        ></MeasurementTile>
        <MeasurementTile
          header="rel. Luftfeuchte"
          value={humidity}
          footer="in %"
        ></MeasurementTile>
        <MeasurementTile
          header="Luftdruck"
          value={pressure}
          footer="in hPa"
          decimals={0}
        ></MeasurementTile>
      </TilesWrapper>
      <TilesWrapper style={{ flexGrow: 1 }}>
        {opensensemapData.data.temperature24.length > 0 && (
          <Chart
            options={{
              chart: {
                id: 'temperature',
                toolbar: {
                  show: false,
                },
                selection: {
                  enabled: false,
                },
                sparkline: {
                  enabled: false,
                },
                zoom: {
                  enabled: false,
                },
                fontFamily: 'Open Sans, sans-serif',
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth',
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: {
                tickAmount: 4,
                title: {
                  text: 'Temperatur in °C',
                },
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0,
                  opacityTo: 0.9,
                  stops: [0, 90, 100],
                },
              },
            }}
            series={[
              {
                name: 'Temperatur',
                data: opensensemapData.data.temperature24.map(
                  (measurement: any) => ({
                    x: measurement.createdAt,
                    y: measurement.value,
                  })
                ),
              },
            ]}
            type="area"
            height={150}
          />
        )}
        {opensensemapData.data.humidity24.length > 0 && (
          <Chart
            options={{
              chart: {
                id: 'humidity',
                toolbar: {
                  show: false,
                },
                selection: {
                  enabled: false,
                },
                sparkline: {
                  enabled: false,
                },
                zoom: {
                  enabled: false,
                },
                fontFamily: 'Open Sans, sans-serif',
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth',
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: {
                tickAmount: 4,
                max: 100,
                title: {
                  text: 'rel. Luftfeuchte in %',
                },
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0,
                  opacityTo: 0.9,
                  stops: [0, 90, 100],
                },
              },
            }}
            series={[
              {
                name: 'rel. Luftfeuchte',
                data: opensensemapData.data.humidity24.map(
                  (measurement: any) => ({
                    x: measurement.createdAt,
                    y: measurement.value,
                  })
                ),
              },
            ]}
            type="area"
            height={150}
          />
        )}
      </TilesWrapper>
    </ComponentWrapper>
  );
};
