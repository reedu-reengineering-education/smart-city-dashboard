import Chart from 'react-apexcharts';
import merge from 'lodash/merge';

interface ITimeSeriesChartProps {
  id: string;
  data: [];
  title: string;
  yAxisTitle: string;
  chartOptions?: any;
}

const TimeSeriesChart = (props: ITimeSeriesChartProps) => {
  const baseOptions = {
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
        format: 'dd MMM yyyy HH:mm',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tickAmount: 3,
      title: {
        text: props.yAxisTitle,
      },
    },
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0,
    //     opacityTo: 0.9,
    //     stops: [0, 90, 100],
    //   },
    // },
  };

  return (
    <Chart
      options={merge(baseOptions, props.chartOptions)}
      series={[
        {
          name: props.title,
          data: props.data,
        },
      ]}
      type="line"
      height="100%"
    />
  );
};

export default TimeSeriesChart;
