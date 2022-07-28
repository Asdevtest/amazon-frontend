import React from 'react'

import {observer} from 'mobx-react'

import {BarChartsCard} from './bar-charts-card/bar-charts-card'
import {BottomCard} from './bottom-card'
import {useClassNames} from './shop-wrapper.style'
import {TopCard} from './top-card'

export const ShopWrapper = observer(({shopInfo}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.shopWrapper}>
      <TopCard data={shopInfo} />
      <div className={classNames.chartsWrapper}>
        <BarChartsCard isRevenue data={shopInfo.profitForTheReportingPeriod} />
        <BarChartsCard data={shopInfo.trafficForTheReportingPeriod} />
      </div>
      <BottomCard data={shopInfo} />
    </div>
  )
})
