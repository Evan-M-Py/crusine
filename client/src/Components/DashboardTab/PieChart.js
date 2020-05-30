import React, { useState } from "react";
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
        datasets:[ 
            {
            label: 'Inventory Catagories',
            backgroundColor: ['#ffd31d',
            '#fae7cb',
            '#ffb385',
            '#ff7272',
            '#f57b51'],
            borderColor: 'rgba(255,99,132,0.2)',
            borderWidth: 1,
            hoverBackgroundColor: ['#ffd31d',
            '#fae7cb',
            '#ffb385',
            '#ff7272',
            '#f57b51'],
            hoverBorderColor: [
                'rgba(255,99,132,1)'
            ],
            data: props.graphData
            }
        ]
    };

    return(
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