import React from "react";
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {

    const pieChartData = {
        labels: [
            'produce',
            'bread',
            'dairy',
            'meat',
            'spices',
            'non-parishable'
        ],
        datasets: [
            {
                label: 'Inventory Catagories',
                backgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                borderColor: '#C4B2BC',
                borderWidth: 1,
                hoverBackgroundColor: [
                    '#61DAFB',
                    '#183B63',
                    '#B7D4DC',
                    '#9379AC',
                    '#664f7d'
                ],
                hoverBorderColor: [
                    '#C4B2BC'
                ],
                data: props.graphData
            }
        ]
    };

    return (
        <div>
            <Pie
                data={pieChartData}
                width={400}
                height={400}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};

export default PieChart;