import React from "react";
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart(props) {

    const doughnutChartData = {
        labels: props.Labels,
        datasets: [
            {
                backgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                hoverBackgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                data: props.DoughnutChartData,
            }
        ]
    };


    return (
        <div className='chart'>
            <Doughnut data={doughnutChartData} />
        </div>
    );
};

export default DoughnutChart;