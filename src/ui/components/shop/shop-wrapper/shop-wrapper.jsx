import React from 'react'

import {observer} from 'mobx-react'

import {formatDateMonthYearWithoutFormatISO} from '@utils/date-time'

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
        <BarChartsCard
          isRevenue
          data={shopInfo.statistics
            .map(el => ({
              ...el,
              month: formatDateMonthYearWithoutFormatISO(el.month),
            }))
            .reverse()}
        />
        <BarChartsCard
          data={shopInfo.statistics
            .map(el => ({
              ...el,
              month: formatDateMonthYearWithoutFormatISO(el.month),
            }))
            .reverse()}
        />
      </div>
      <BottomCard data={shopInfo} />
    </div>
  )
})
