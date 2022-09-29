import "chartjs-adapter-moment"
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js"
import { Line } from 'react-chartjs-2'

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data2 = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [1,2,3,2,10,4,4],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [1,2,3,2,10,4,4].reverse(),

//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };
  
  export const options = {
    responsive: true,
    elements: {
        point:{
            radius: 0
        }
    },
    scales: {
        x: {
            
            type: 'time',
            time: {
                unit: 'day',
                tooltipFormat: 'YYYY-MM-DD HH:mm',

            },
            grid: {
              color: 'white'
            }
                
        },
        y: {
          grid: {
            color: 'white'
          }
        }


    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temprature at parkinglot',
      },
    },
  };
  
  
  
  interface SensorParams {
    time: string[]
    measurments: number[]
  }
  export function SensorGraph({time, measurments}: SensorParams) {
    
    console.log(measurments)
    const data = {
        labels: time.map(t=>(new Date(t+"Z"))),
        datasets: [
          {
            label: 'Temperature',
            data: measurments,
            borderColor: 'blue',
            backgroundColor: 'white',
          },
        ],
      };
    // @ts-ignore
    return <Line options={options} data={data} />;
  }

  