import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { MdFiberManualRecord } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { TwoBarsChart } from '@components/shared/charts/two-bars-chart/two-bars-chart'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './charts-form.style'

const filterSettings = {
  SIX_MONTHS: 'SIX_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  ALL_MONTHS: 'ALL_MONTHS',
}

export const ChartsForm = observer(({ data, isRevenueBeggin }) => {
  const { classes: styles, cx } = useStyles()

  const [isRevenue, setIsRevenue] = useState(isRevenueBeggin)

  const [curFilterSetting, setCurFilterSetting] = useState(filterSettings.ALL_MONTHS)

  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
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
  }, [curFilterSetting])

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardHeaderWrapper}>
        <div className={styles.buttonsWrapper}>
          <CustomButton variant="outlined" onClick={() => setIsRevenue(true)}>
            {t(TranslationKey.Revenue)}
          </CustomButton>
          <CustomButton variant="outlined" onClick={() => setIsRevenue(false)}>
            {t(TranslationKey['Website traffic'])}
          </CustomButton>
        </div>

        <div className={styles.buttonsWrapper}>
          <div className={styles.barStatusWrapper}>
            <MdFiberManualRecord size={22} color="primary" />
            <p className={styles.cardTitle}>
              {isRevenue
                ? t(TranslationKey['Gross income']).toLowerCase()
                : t(TranslationKey['View page']).toLowerCase()}
            </p>
          </div>
          <div className={styles.barStatusWrapper}>
            <MdFiberManualRecord size={22} classes={{ root: styles.indicator }} />
            <p className={styles.cardTitle}>
              {isRevenue
                ? t(TranslationKey['Pure profit']).toLowerCase()
                : t(TranslationKey['Unique visitors']).toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <TwoBarsChart
        data={filteredData}
        xRowKey={'month'}
        firstBarKey={isRevenue ? 'grossIncome' : 'uniqueCustomers'}
        secondBarKey={isRevenue ? 'pureIncome' : 'webpageVisits'}
        unit={isRevenue && ' $'}
      />

      <div className={styles.buttonsWrapper}>
        <CustomButton variant="outlined" onClick={() => setCurFilterSetting(filterSettings.SIX_MONTHS)}>
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
  )
})
