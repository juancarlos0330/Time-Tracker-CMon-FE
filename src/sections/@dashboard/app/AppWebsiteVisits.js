import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageData: PropTypes.array
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, imageData, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'time' },
    tooltip: {
      // shared: true,
      // intersect: false,
      // y: {
      //   formatter: (y) => {
      //     if (typeof y !== 'undefined') {
      //       return `${y.toFixed(0)} events`;
      //     }
      //     return y;
      //   },
      // },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        if (imageData[dataPointIndex]) {
          return (
            `<img src="/static/screenshots/${imageData[dataPointIndex]}" style="width: 300px; height: 300px" alt="screenshot" />`
          )
        }
        return '<div>No Screenshot</div>'
      },
    },
    events: {
      dataPointSelection: (event, chartContext, config) => {
        console.log(chartContext, config);
      }
    }
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
