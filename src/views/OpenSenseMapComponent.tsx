import React, { useEffect, useState, Suspense, lazy } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadOsemData, loadOsemTimeseriesData } from '../actions/opensensemap';
import BaseWidgetComponent from '../components/BaseWidget';
import { TilesWrapper, ChartWrapper } from '../components/styles';
import Cloud from '../resources/animated/Cloud';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
const TimeSeriesChart = lazy(() => import('../components/TimeSeriesChart'));

const OpenSenseMapComponent = () => {
  const opensensemapData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.opensensemap
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [opensensemapData]);

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
    <BaseWidgetComponent
      title="Wetter senseBox"
      icon={Cloud}
      loading={loading}
      mapFeatureTag="opensensemap"
      show24h={() => {
        setLoading(true);
        dispatch(loadOsemData());
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);
        const to = new Date();

        dispatch(loadOsemTimeseriesData(from, to));
      }}
      dataSource={`
Hier sind Umweltdaten der senseBox der Smart City Münster zu sehen. Bei der senseBox handelt es sich um eine kleine Umweltmessstation für Zuhause: Man kann im Baukastensystem verschiedene Sensoren und Module anschließen. Die senseBox eignet sich einerseits für Schüler und Schülerinnen, aber auch für interessierte Bürger und Bürgerinnen, die sich einen eigenen Umweltsensor basteln möchten. Und all das ist komplett Open Source, liefert Open Data und kommt aus Münster!

Die senseBox der Smart City Münster ist, ganz im Sinne der Allianz Smart City Münster, auf dem Dach der benachbarten Stadtwerke Münster installiert. Gemeinsam Daten sammeln für eine smartere Stadt!

Die Daten werden von der Plattform ["OpenSenseMap"](https://opensensemap.org/explore/5f7ddc9f692773001c7da31c) abgerufen. Dort findet man viele weitere Sensoren im Stadtgebiet Münster, sowie weltweit. Die OpenSenseMap ist eine offene Plattform für offene Sensordaten, an der jeder teilnehmen kann. Das Projekt entstand 2015 am Institut für Geoinformatik in Münster.

Weitere Informationen unter: [https://sensebox.de](https://sensebox.de )

Datenquelle: Stabsstelle Smart City, Stadt Münster / opensensemap.org
Kontakt für inhaltliche Fragen: [smartcity@stadt-muenster.de](smartcity@stadt-muenster.de)

Daten im Open-Data-Portal:
- [Umweltsensordaten im Stadtgebiet](https://opendata.stadt-muenster.de/dataset/umweltsensordaten-im-stadtgebiet)
`}
      details={
        <ChartWrapper>
          {opensensemapData.data.temperature24.length > 0 &&
            opensensemapData.data.humidity24.length > 0 && (
              <Suspense fallback={<Skeleton count={5} />}>
                <TimeSeriesChart
                  id="weather"
                  type="line"
                  series={[
                    {
                      name: 'Temperatur',
                      data: opensensemapData.data.temperature24,
                    },
                    {
                      name: 'rel. Luftfeuchte',
                      data: opensensemapData.data.humidity24,
                    },
                  ]}
                  chartOptions={{
                    colors: ['#f28c00', '#009fe3'],
                    xaxis: {
                      labels: {
                        show: false,
                        formatter: (value: string) => {
                          const date = new Date(value);

                          return `${date.toLocaleString()} Uhr`;
                        },
                      },
                    },
                    yaxis: [
                      {
                        title: {
                          text: 'Temperatur in °C',
                        },
                        labels: {
                          formatter: (value: number) => {
                            return value.toFixed(1);
                          },
                        },
                      },
                      {
                        opposite: true,
                        title: {
                          text: 'rel. Luftfeuchte in %',
                        },
                        // max: 100.001, // adding the .001 still shows the hover dot on the line
                      },
                    ],
                    tooltip: {
                      y: {
                        formatter: (value: number, { seriesIndex }) => {
                          const unit = seriesIndex === 0 ? '°C' : '%';
                          return `${value.toFixed(1)} ${unit}`;
                        },
                      },
                    },
                  }}
                ></TimeSeriesChart>
              </Suspense>
            )}
        </ChartWrapper>
      }
    >
      <TilesWrapper>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Temperatur"
            value={temperature}
            footer="in °C"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="rel. Luftfeuchte"
            value={humidity}
            footer="in %"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Luftdruck"
            value={pressure}
            footer="in hPa"
            decimals={0}
          ></MeasurementTile>
        </Suspense>
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default OpenSenseMapComponent;
