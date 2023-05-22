import React, { FC } from 'react'

import { LineChart, Line } from 'recharts'

interface Props {
  profit?: boolean
  data: [{}]
}

export const LinesChart: FC<Props> = ({ profit, data }) => {
  return (
    <div>
      {profit ? (
        <LineChart width={168} height={47} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#0056B2" dot={false} isAnimationActive={false} />
        </LineChart>
      ) : (
        <LineChart width={168} height={47} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#0056B2" dot={false} isAnimationActive={false} />
        </LineChart>
      )}
    </div>
  )
}
