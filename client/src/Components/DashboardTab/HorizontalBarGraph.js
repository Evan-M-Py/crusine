import React, { useState } from "react";
import { HorizontalBar } from 'react-chartjs-2';

const HorizontalBarGraph = (props) => {

    const horizontalBarGraphData = {
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
            label: 'Expense Frequency',
            backgroundColor: ['#ffd31d',
            '#fae7cb',
            '#ffb385',
            '#ff7272'],
            borderColor: 'rgba(255,99,132,0.2)',
            borderWidth: 1,
            hoverBackgroundColor: ['#ffd31d',
            '#fae7cb',
            '#ffb385',
            '#ff7272'],
            hoverBorderColor: [
                'rgba(255,99,132,1)'
            ],
            data: props.graphData
            }
        ]
    };

    return(
        <div>
             <HorizontalBar

                height={275}
                width={550}
            />
        </div>
    );
};

export default HorizontalBarGraph;