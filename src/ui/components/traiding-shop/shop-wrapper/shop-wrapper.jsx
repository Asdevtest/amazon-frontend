import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { SettingsModel } from '@models/settings-model'

import { formatDateMonthYearWithoutFormatISO } from '@utils/date-time'

import { BarChartsCard } from './bar-charts-card/bar-charts-card'
import { BottomCard } from './bottom-card'
import { useClassNames } from './shop-wrapper.style'
import { TopCard } from './top-card'

export const ShopWrapper = observer(({ userInfo, shopInfo, onClickEditBtn }) => {
  const { classes: classNames } = useClassNames()
  const [updatedShopInfo, setUpdatedShopInfo] = useState(shopInfo)

  useEffect(() => {
    setUpdatedShopInfo(() => ({ ...shopInfo }))
  }, [SettingsModel.languageTag])

  return (
    <div className={classNames.shopWrapper}>
      <TopCard userInfo={userInfo} data={updatedShopInfo} onClickEditBtn={onClickEditBtn} />
      <div className={classNames.chartsWrapper}>
        <BarChartsCard
          isRevenue
          data={updatedShopInfo.statistics
            .map(el => ({
              ...el,
              month: formatDateMonthYearWithoutFormatISO(el.month),
            }))
            .reverse()}
        />
        <BarChartsCard
          data={updatedShopInfo.statistics
            .map(el => ({
              ...el,
              month: formatDateMonthYearWithoutFormatISO(el.month),
            }))
            .reverse()}
        />
      </div>
      <BottomCard data={updatedShopInfo} />
    </div>
  )
})
