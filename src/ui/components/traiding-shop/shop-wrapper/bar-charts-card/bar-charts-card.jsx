import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { MdFiberManualRecord } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { TwoBarsChart } from '@components/shared/charts/two-bars-chart/two-bars-chart'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './bar-charts-card.style'

const filterSettings = {
  SIX_MONTHS: 'SIX_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  ALL_MONTHS: 'ALL_MONTHS',
}

export const BarChartsCard = observer(({ isRevenue, data }) => {
  const { classes: styles, cx } = useStyles()

  const [curFilterSetting, setCurFilterSetting] = useState(filterSettings.ALL_MONTHS)

  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    setFilteredData(data)
    switch (curFilterSetting) {
      case filterSettings.ALL_MONTHS:
        return setFilteredData(data)

      case filterSettings.TWELVE_MONTHS:
        return setFilteredData(data.slice(0, 12))

      case filterSettings.SIX_MONTHS:
        return setFilteredData(data.slice(0, 6))

      default:
        return setFilteredData(data)
    }
  }, [curFilterSetting, SettingsModel.languageTag])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeaderWrapper}>
          <p>{isRevenue ? t(TranslationKey.Revenue) : t(TranslationKey['Website traffic'])}</p>
          <div className={styles.barStatusesWrapper}>
            <div className={styles.barStatusWrapper}>
              <MdFiberManualRecord size={18} className={styles.icon} />
              <p className={styles.cardTitle}>
                {isRevenue ? t(TranslationKey['gross profit']) : t(TranslationKey['page view'])}
              </p>
            </div>
            <div className={styles.barStatusWrapper}>
              <MdFiberManualRecord size={18} classes={{ root: styles.indicator }} />
              <p className={styles.cardTitle}>
                {isRevenue ? t(TranslationKey['net income']) : t(TranslationKey['unique users'])}
              </p>
            </div>
          </div>
        </div>

        <TwoBarsChart
          data={filteredData}
          xRowKey={'month'}
          firstBarKey={isRevenue ? 'grossIncome' : 'webpageVisits'}
          secondBarKey={isRevenue ? 'pureIncome' : 'uniqueCustomers'}
        />

        <div className={styles.buttonsWrapper}>
          <CustomButton onClick={() => setCurFilterSetting(filterSettings.SIX_MONTHS)}>
            {`6 ${t(TranslationKey.months)}`}
          </CustomButton>
          <CustomButton variant="outlined" onClick={() => setCurFilterSetting(filterSettings.TWELVE_MONTHS)}>
            {`12 ${t(TranslationKey.months)}`}
          </CustomButton>
          <CustomButton variant="outlined" onClick={() => setCurFilterSetting(filterSettings.ALL_MONTHS)}>
            {t(TranslationKey['All time'])}
          </CustomButton>
        </div>
      </div>
    </div>
  )
})
