import React from 'react'
import { Line } from 'react-chartjs-2'

interface ChartProps {
    title: string
    data : ChartData
}

interface ChartData {
    labels: string[], // x축을 나눌 라벨
    datasets : ChartDataset[]
}

interface ChartDataset {
    label: string // 차트 위에 표시되는 이름
    data: number[] // 데이터, 순서대로 표시됨
    fill?: boolean // 채움옵션
    backgroundColor: string // 선 채울 색(The line fill color)
    borderColor: string // 선 색(The line color)
    showLine?: boolean // 그래프에 표시여부
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}

export default function Chart({ title, data }: ChartProps) {
    return (
    <>
        <h1>{title}</h1>
        <Line data={data} options={options} />
    </>
    )
}