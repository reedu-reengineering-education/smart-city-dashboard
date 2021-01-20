import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import merge from 'lodash/merge';

interface ITimeSeriesChartProps {
  id: string;
  series: any[];
  title: string;
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
      text: props.unit ? `${props.title} in ${props.unit}` : `${props.title}`,
      align: 'left',
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (value: number) => {
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
      height="100%"
    />
  );
};

export default TimeSeriesChart;
