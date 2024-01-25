/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { Line, LineChart } from 'recharts'

interface Props {
  profit?: boolean
  data: any
}

export const LinesChart: FC<Props> = memo(({ profit, data }) => (
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
))
