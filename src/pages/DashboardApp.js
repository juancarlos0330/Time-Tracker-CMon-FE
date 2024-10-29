// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import React from 'react'
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
// components
import { formatDate } from '../utils'
import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,st
  // AppConversionRates,.string sheirripchels at.com
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // const theme = useTheme();
  const [dateState, setDateState] = React.useState(new Date());
  const handleDateChange = (newValue) => {
    setDateState(new Date(newValue.$d));
    axiosPost(new Date(newValue.$d))
  };

  // const [type, setType] = React.useState('date');

  // const handleSelectChange = (event) => {
  //   setType(event.target.value);
  // };

  const [cardData, setCardData] = React.useState({});
  const [chartData, setChartData] = React.useState({});
  const [imageData, setImageData] = React.useState([]);
  const [dataFetchR, setDataFetchR] = React.useState(false);

  function axiosPost(date = new Date()) {
    const apiUrl = `http://localhost:3001/api/getOne/${formatDate(date)}`;
    axios.get(apiUrl).then((response) => {
      const { cardData, chartData, imageData } = response.data;
      setCardData(cardData);
      setChartData(chartData);
      setDataFetchR(true)
      setImageData(imageData)
    });
  }

  React.useEffect(() => {
    axiosPost()
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent='space-between'>
          <Grid item>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Time Tracking Dashboard
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex' }}>
            {/* <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // sx={{ width: 200 }}
                value={type}
                // label="type"
                onChange={handleSelectChange}
              >
                <MenuItem value={'date'}>Date</MenuItem>
                <MenuItem value={'week'}>Week</MenuItem>
                <MenuItem value={'month'}>Month</MenuItem>
              </Select>
            </div> */}
            <div style={{ width: 160, marginLeft: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  // label="Date Select"
                  inputFormat="MM/DD/YYYY"
                  value={dateState}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        </Grid>
        {dataFetchR && <Grid container spacing={3} justifyContent='center'>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Overall" value={cardData.overallAction} color="secondary" icon={'akar-icons:circle-plus-fill'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="System" value={cardData.systemAction} color="secondary" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Keyboard" value={cardData.keyboardAction} color="secondary" icon={'fluent:keyboard-24-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Mouse" value={cardData.mouseAction} color="secondary" icon={'ic:sharp-mouse'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="System Action" value={cardData.systemAction} color="success" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Mouse Action" value={cardData.mouseAction} icon={'ic:sharp-mouse'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Keyboard Action" value={cardData.keyboardAction} color="warning" icon={'fluent:keyboard-24-filled'} />
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Work Start Time" value={cardData.workStartTime} color="primary" icon={'mdi:alarm-clock-check'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Work End Time" value={cardData.workEndTime} color="primary" icon={'mdi:alarm-clock-snooze'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Working Time" value={cardData.workingTime} color="primary" icon={'mdi:alarm-clock'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Effectiveness" value={cardData.effectiveness} icon={'mdi:chart-production-possibility-frontier'} />
          </Grid> */}

          <Grid item xs={12}>
            <AppWebsiteVisits
              title="Mouse Activities"
              // subheader="(+43%) than last year"
              chartLabels={chartData.chartLabels}
              imageData={imageData}
              chartData={[
                {
                  name: 'Mouse Action',
                  type: 'area',
                  fill: 'gradient',
                  data: chartData.trackData4,
                }
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <AppWebsiteVisits
              title="Other Activities"
              // subheader="(+43%) than last year"
              chartLabels={chartData.chartLabels}
              imageData={imageData}
              chartData={[
                {
                  name: 'Overall Action',
                  type: 'area',
                  fill: 'gradient',
                  data: chartData.trackData1,
                },
                {
                  name: 'System Action',
                  type: 'area',
                  fill: 'gradient',
                  data: chartData.trackData2,
                },
                {
                  name: 'Keyboard Action',
                  type: 'area',
                  fill: 'gradient',
                  data: chartData.trackData3,
                }
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>}
      </Container>
    </Page>
  );
}
