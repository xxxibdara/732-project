import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart(pros) {
  const barChartData= pros.BarChartData

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: barChartData.chartTitle,
        font: {
          size: 20
        }
      },
    },
  };

  const labels = barChartData.xValues

  const values = barChartData.yValues

  const data = {
    labels,
    datasets: [
      {
        label: barChartData.dataSetLabels[0],
        data: labels.map((value, index, array) => values[index]),
        backgroundColor: barChartData.backgroundColor[0],
      },
    ],
  };

  return <Bar options={options} data={data}/>;
}
