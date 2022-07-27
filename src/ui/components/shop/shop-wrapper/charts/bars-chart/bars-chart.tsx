import React, {FC} from 'react'

import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar} from 'recharts'

interface Props {
  data: [{}]
}

export const BarsChart: FC<Props> = ({data}) => {
  return (
    <div style={{width: '100%', height: '272px'}}>
      <ResponsiveContainer width={'100%'} height={272}>
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
          <XAxis dataKey="name" />
          <YAxis />

          <Bar dataKey="pv" fill="#006CFF" />
          <Bar dataKey="uv" fill="#CCE2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
