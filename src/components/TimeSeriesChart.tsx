/**
 * Smart City Münster Dashboard
 * Copyright (C) 2022 Reedu GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import merge from 'lodash/merge';

interface ITimeSeriesChartProps {
  id: string;
  series: any[];
  height?: number | string;
  width?: number | string;
  title?: string;
  unit?: string;
  chartOptions?: ApexOptions;
  type?:
    | 'area'
    | 'line'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'rangeBar'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'radar'
    | 'polarArea';
}

const TimeSeriesChart = (props: ITimeSeriesChartProps) => {
  const baseOptions: ApexOptions = {
    chart: {
      id: props.id,
      defaultLocale: 'de',
      locales: [
        {
          name: 'de',
          options: {
            months: [
              'Januar',
              'Februar',
              'März',
              'April',
              'Mai',
              'Juni',
              'Juli',
              'August',
              'September',
              'Oktober',
              'November',
              'Dezember',
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mär',
              'Apr',
              'Mai',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Okt',
              'Nov',
              'Dez',
            ],
            days: [
              'Sonntag',
              'Montag',
              'Dienstag',
              'Mittwoch',
              'Donnerstag',
              'Freitag',
              'Samstag',
            ],
            shortDays: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
          },
        },
      ],
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
    tooltip: {
      x: {
        show: false,
        format: 'HH:mm',
      },
      y: {
        formatter: (value: number) => {
          if (!value) return '';
          return `${value.toFixed(1)} ${props.unit}`;
        },
      },
      marker: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      },
    },
    colors: ['#009fe3'],
    title: {
      text: props.title
        ? props.unit
          ? `${props.title} in ${props.unit}`
          : `${props.title}`
        : undefined,
      align: 'left',
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value: number) => {
          if (!value) return '';
          return value.toFixed(0);
        },
      },
    },
  };

  return (
    <Chart
      options={merge(baseOptions, props.chartOptions)}
      series={props.series}
      type={props.type || 'area'}
      height={props.height || '100%'}
      width={props.width || '100%'}
    />
  );
};

export default TimeSeriesChart;
