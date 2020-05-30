import React  from "react";
import { Bar, Line, Pie} from 'react-chartjs-2';

function BarGraph(props) {
const barGraphData = {
            labels: [ 
                'foh/patio set-up', 
                'misc ', 
                'tools', 
                'kitchen appliances', 
                'vehicle'
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
        <div className='chart'>
            <Bar
                data={barGraphData}
                width={500}
                height={450}
                options={{ 
                    maintainAspectRatio: false 
                }}
            />
        </div>
    );
};

export default  BarGraph;