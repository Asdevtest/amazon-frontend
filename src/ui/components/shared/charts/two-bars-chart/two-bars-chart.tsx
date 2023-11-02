import React, { FC } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Props {
  data: Array<Object>
  xRowKey: string
  firstBarKey: string
  secondBarKey: string
  height?: number
  unit?: string
}

export const TwoBarsChart: FC<Props> = ({ data, xRowKey, firstBarKey, secondBarKey, height = 272, unit }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width={'100%'} height={height}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xRowKey} />
          <YAxis unit={unit} />

          <Bar dataKey={firstBarKey} fill="#006CFF" />
          <Bar dataKey={secondBarKey} fill="#CCE2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
