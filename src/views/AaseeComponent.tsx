import React, { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { loadAaseeData, loadAaseeTimeseriesData } from '../actions/aasee';
import BaseWidgetComponent from '../components/BaseWidget';
import { ChartWrapper, TilesWrapper } from '../components/styles';
import TimeSeriesChart from '../components/TimeSeriesChart';
import Water from '../resources/animated/Water';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));

const FILTER_MIN = -5;
const FILTER_MAX = 45;
const minMaxFilter = (measurement: { time: Date; value: number }) => {
  return measurement.value >= FILTER_MIN && measurement.value <= FILTER_MAX;
};

const AaseeComponent = () => {
  const aaseeData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.aasee
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [aaseeData]);

  const [temperature, setTemperature] = useState(0);
  const [ph, setPh] = useState(0);
  const [oxygen, setOxygen] = useState(0);

  useEffect(() => {
    if (aaseeData.data.data) {
      setTemperature(aaseeData.data.data.water_temperature[0].value);
      setPh(aaseeData.data.data.pH[0].value);
      setOxygen(aaseeData.data.data.dissolved_oxygen[0].value);
    }
  }, [aaseeData]);

  return (
    <BaseWidgetComponent
      title="Wasserqualität Aasee"
      icon={Water}
      mapFeatureTag="aasee"
      loading={loading}
      detailsDefault={true}
      mode={'24h'}
      show24h={() => {
        setLoading(true);
        dispatch(loadAaseeData());
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);

        dispatch(loadAaseeTimeseriesData(from));
      }}
      dataSource={`
Der Aasee ist Münsters zentralstes Naherholungsgebiet. Der 2.300 m lange See ist nur 15 Fußminuten vom berühmten Prinzipalmarkt entfernt und für Bewohner:innen und Touristen eine blau-grüne Oase im Stadtbild von Münster. Im Hitzesommer 2018 sank der Sauerstoffgehalt des Aasees soweit, dass es zu einem großen Fischsterben kam. Der Rückgang des Sauerstoffgehalts blieb damals lange unentdeckt.

Über Sensoren in Messtonnen bzw. Bojen im Aasee, wird nun seit dem Sommer 2020 die Wasserqualität des innerstädtischen Gewässers fortlaufend gemessen. Die gewonnenen Daten werden über das LoRaWAN-Netz der Stadtwerke Münster in Echtzeit an die zuständigen Ämter übermittelt. Auf diese Weise können Maßnahmen zur Verbesserung der Wasserqualität frühzeitig ergriffen werden. Dieses Projekt entstand als Projektidee im Münsterhack 2018, wurde von der Stadtverwaltung aufgegriffen und in Kooperation mit den Stadtwerken Münster umgesetzt. Zudem werden die digitalen Messdaten mit regelmäßigen analogen Gewässerproben abgeglichen. Den nächsten heißen Sommern blickt Münster damit etwas entspannter entgegen.

Weitere Informationen: [https://smartcity.ms/aaseemonitoring/](https://smartcity.ms/aaseemonitoring/)

Datenquelle: Abteilung Planung Wasserwirtschaft, Amt für Mobilität und Tiefbau, Stadt Münster

Kontakt für inhaltliche Fragen: Daniel Berger, [bergerd@stadt-muenster.de](mailto:bergerd@stadt-muenster.de)
`}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="bicycles"
              series={[
                {
                  name: 'Wassertemperatur',
                  data: aaseeData?.data?.data?.water_temperature
                    .filter(minMaxFilter)
                    .map((measurement: any) => {
                      return {
                        x: measurement.time,
                        y: measurement.value,
                      };
                    }),
                },
                {
                  name: 'Sauerstoff',
                  data: aaseeData?.data?.data?.dissolved_oxygen
                    .filter(minMaxFilter)
                    .map((measurement: any) => {
                      return {
                        x: measurement.time,
                        y: measurement.value,
                      };
                    }),
                },
                {
                  name: 'pH-Wert',
                  data: aaseeData?.data?.data?.pH
                    .filter(minMaxFilter)
                    .map((measurement: any) => {
                      return {
                        x: measurement.time,
                        y: measurement.value,
                      };
                    }),
                },
              ]}
              type={'line'}
              chartOptions={{
                colors: ['#f28c00', '#009fe3', '#86bc25'],
                yaxis: {
                  labels: {
                    formatter: (value: number) => {
                      if (!value) return '';
                      return value.toFixed(1);
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
                    formatter: (value: number, { seriesIndex }) => {
                      if (!value) return '';

                      const units = ['°C', 'mg/L', ''];
                      const unit = units[seriesIndex];
                      return `${value.toFixed(1)} ${unit}`;
                    },
                  },
                },
                chart: {
                  animations: {
                    animateGradually: {
                      enabled: false,
                    },
                    speed: 100,
                  },
                },
              }}
            ></TimeSeriesChart>
          </Suspense>
        </ChartWrapper>
      }
    >
      <TilesWrapper>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Sauerstoff"
            value={oxygen}
            footer="in mg/L"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="Temperatur"
            value={temperature}
            footer="in °C"
          ></MeasurementTile>
        </Suspense>
        <Suspense fallback={<Skeleton width="100%" height="100%" />}>
          <MeasurementTile
            header="pH-Wert"
            value={ph}
            footer="pH"
          ></MeasurementTile>
        </Suspense>
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default AaseeComponent;
