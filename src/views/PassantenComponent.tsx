import React, { lazy, Suspense, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  loadPedestrianData,
  loadPedestrianTimeseriesData,
} from '../actions/passanten';
import BaseWidgetComponent from '../components/BaseWidget';
import { TilesWrapper } from '../components/styles';
import Pedestrian from '../resources/animated/Pedestrian';

const MeasurementTile = lazy(() => import('../components/MeasurementTile'));
const TimeSeriesChart = lazy(() => import('../components/TimeSeriesChart'));

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const timeRange = (timestamp: string) => {
  const date = new Date(timestamp);

  return `${date.getHours()} - ${date.getHours() + 1} Uhr`;
};

const PassantenComponent = () => {
  const pedestrianData: ServiceState = useSelector(
    (state: RootStateOrAny) => state.passanten
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [pedestrianData]);

  const dispatch = useDispatch();

  return (
    <BaseWidgetComponent
      title="Passanten"
      icon={Pedestrian}
      loading={loading}
      mapFeatureTag="pedestrians"
      dataSource={`
Die Passantenfrequenz ist ein wichtiger Indikator für die Attraktivität einer Innenstadt. Egal ob Einzelhändler, Investor, Stadt-, Verkehrsplaner, Handelsforscher oder Innenstadtbesucher, verschiedenste Akteure profitieren von Passantenfrequenzdaten. Die automatische Zählung geschieht in der Innenstadt von Münster tagesaktuell an drei Standorten: Alter Fischmarkt, Ludgeristraße und Rothenburg.

Die Daten werden anonymisiert per Laserscanner erhoben. Die Messung geschieht 24 Stunden pro Tag, 7 Tage in der Woche.

Neben den automatisch erhobenen Daten werden in unregelmäßigen Abständen im Auftrag der Wirtschaftsförderung Münster weitere Zählungen durchgeführt. Beispielhafte Auswertungen dieser Zahlen finden Sie auf dem Open-Data-Portal. Wenn Sie darüber hinausgehend Interesse an Daten zu Passantenzählungen in der Stadt Münster haben, wenden Sie sich bitte an die Wirtschaftsförderung Münster GmbH.

Datenquelle: Wirtschaftsförderung Münster GmbH in Zusammenarbeit mit hystreet.com

Kontakt für inhaltliche Fragen: [https://www.wfm-muenster.de/die-wfm/ansprechpartner/](https://www.wfm-muenster.de/die-wfm/ansprechpartner/)

**Daten im Open-Data-Portal:**
- [Passantenfrequenzen](https://opendata.stadt-muenster.de/dataset/tagesaktuelle-passantenfrequenzen-einzelhandelslagen-der-innenstadt-m%C3%BCnster)
`}
      show24h={() => {
        setLoading(true);
        dispatch(loadPedestrianData());
      }}
      show7d={() => {
        setLoading(true);
        let from = new Date();
        from.setDate(from.getDate() - 7);
        const to = new Date();

        dispatch(loadPedestrianTimeseriesData(from, to));
      }}
      show1m={() => {
        setLoading(true);
        let from = new Date();
        from.setMonth(from.getMonth() - 1);
        const to = new Date();

        dispatch(loadPedestrianTimeseriesData(from, to));
      }}
      detailsDefault={true}
      mode={'24h'}
      details={
        <ChartWrapper>
          <Suspense fallback={<Skeleton count={5} />}>
            <TimeSeriesChart
              id="temperature"
              series={
                pedestrianData.data?.length > 0 &&
                pedestrianData.data?.map((sensor: any) => {
                  return {
                    name: sensor.name,
                    data: sensor.measurements?.slice(0, -1).map((m: any) => ({
                      x: m.timestamp,
                      y: m.pedestrians_count,
                    })),
                  };
                })
              }
              type={'line'}
              chartOptions={{
                colors: ['#009fe3', '#86bc25', '#fdc300', '#ea4f3d'],
                yaxis: {
                  title: {
                    text: 'Passanten pro Stunde',
                  },
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

                      return `${date.getHours()} - ${date.getHours() + 1} Uhr`;
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
          </Suspense>
        </ChartWrapper>
      }
    >
      <TilesWrapper>
        {pedestrianData.data?.length > 0 &&
          pedestrianData.data?.map((p: any) => (
            <Suspense
              key={p.id}
              fallback={<Skeleton width="100%" height="100%" />}
            >
              <MeasurementTile
                key={p.id}
                footer={timeRange(
                  p.measurements[p.measurements.length - 2].timestamp
                )}
                header={p.name.replace('(West)', '')}
                value={
                  p.measurements[p.measurements.length - 2].pedestrians_count
                }
                decimals={0}
              ></MeasurementTile>
            </Suspense>
          ))}
      </TilesWrapper>
    </BaseWidgetComponent>
  );
};

export default PassantenComponent;
