import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { SettingsModel } from '@models/settings-model'

import { formatDateMonthYearWithoutFormatISO } from '@utils/date-time'

import { useStyles } from './shop-wrapper.style'

import { BarChartsCard } from './bar-charts-card/bar-charts-card'
import { BottomCard } from './bottom-card'
import { TopCard } from './top-card'

export const ShopWrapper = observer(({ userInfo, shopInfo, onClickEditBtn }) => {
  const { classes: styles } = useStyles()
  const [updatedShopInfo, setUpdatedShopInfo] = useState(shopInfo)

  useEffect(() => {
    setUpdatedShopInfo(() => ({ ...shopInfo }))
  }, [SettingsModel.languageTag])

  return (
    <div className={styles.shopWrapper}>
      <TopCard userInfo={userInfo} data={updatedShopInfo} onClickEditBtn={onClickEditBtn} />
      <div className={styles.chartsWrapper}>
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
