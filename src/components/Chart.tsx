import React, {useState, useEffect} from 'react';
import { Line } from '@ant-design/plots';

const Chart: React.FC = ({ rawData, ttf, cf, ifVal }: any) => {
  const data: any = rawData.reduce((acc: any, cur: any) => {
    let label = ''
    const y = cur.year;
    if (y === 1) {
      label = '1st Year'
    } else if (y === 2) {
      label = '2nd Year'
    } else if (y === 3) {
      label = '3rd Year'
    } else {
      label = `${y}th Year`
    }
    return [
      ...acc,
      {year: label, value: cur.car, type: 'Weighted Total Cost of Car Loaning'},
      {year: label, value: cur.publicTransport, type: 'Public Transport'},
      {year: label, value: Math.round(cur.totalCarCost), type: 'Actual Total Cost of Car Loaning'},
    ]
  }, [])
  console.log(data)
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      label: {
      },
    },
    yAxis: {
      visible: false,
      label: {
        formatter: (v) => `${v} ฿`,
      },
    },
    color: ({ type }: any) => {
      if (type === 'Actual Total Cost of Car Loaning') {
        return '#a9a9a9'
      } else if (type === 'Weighted Total Cost of Car Loaning') {
        return '#30BF78'
      } else {
        return '#F4664A'
      }
    },
    lineStyle: ({ type }: any) => {
      if (type === 'Actual Total Cost of Car Loaning') {
        return {
          lineDash: [4, 4],
          opacity: 0.5,
        };
      }

      return {
        opacity: 1,
      };
    },
    legend: {
      layout: 'vertical',
      itemName: {
        formatter: (v) => {
          if (v === 'Weighted Total Cost of Car Loaning') {
            return `Weighted Total Cost of Car Loaning (WTCCL) is calculated by

              Travel Time Factor (TTF): ${ttf}
              Convenience Factor (CF) : ${cf}
              Income Factor (IF) : ${ifVal}

              WTCCL = WTCCL / (TTF + CF + IF)
            `
          } else {
            return v
          }
        },
      },
    },
  };
  return (<Line {...config} />)
}

export default Chart;