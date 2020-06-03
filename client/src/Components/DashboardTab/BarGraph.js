import React from "react";
import { Bar } from 'react-chartjs-2';

function BarGraph(props) {
    const barGraphData = {
        labels: [
            'FOH',
            'Misc. ',
            'Tools',
            'Kitchen Appliances',
            'Vehicle'
        ],
        datasets: [
            {
                label: 'Expense Frequency',
                backgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                borderColor: 'rgba(255,99,132,0.2)',
                borderWidth: 1,
                hoverBackgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                hoverBorderColor: [
                    'rgba(255,99,132,1)'
                ],
                data: props.graphData,

            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <div className='chart'>
            <Bar
                data={barGraphData}
                width={500}
                height={450}
                options={options}
            />
        </div>
    );
};

export default BarGraph;