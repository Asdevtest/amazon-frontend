import React from 'react'

import {observer} from 'mobx-react'

import {BarChartsCard} from './bar-charts-card/bar-charts-card'
import {BottomCard} from './bottom-card'
import {useClassNames} from './shop-wrapper.style'
import {TopCard} from './top-card'

export const ShopWrapper = observer(({data}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.shopWrapper}>
      <TopCard data={data} />
      <div className={classNames.chartsWrapper}>
        <BarChartsCard isRevenue data={data} />
        <BarChartsCard data={data} />
      </div>
      <BottomCard />
    </div>
  )
})
