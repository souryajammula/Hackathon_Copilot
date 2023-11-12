import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
const ChartDisplay = ({ data, country}) => {
    Chart.register(...registerables);

    console.log("chart lo unna");
    console.log(data)
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: {country},
                data: data.values,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={chartData} />;
};

export default ChartDisplay;
