"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const eData = [4500, 6500, 6700, 2455, 7655, 7866, 8633]
const xLabels = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];

export default function Chart() {
  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: '  ecom' },
        { data: uData, label: '   market' },
        { data: eData, label: '   stores' }
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}