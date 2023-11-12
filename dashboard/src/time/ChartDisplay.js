import { Line } from 'react-chartjs-2';

const ChartDisplay = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Data',
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
