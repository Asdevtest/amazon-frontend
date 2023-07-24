import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { TwoBarsChart } from '@components/shared/charts/two-bars-chart/two-bars-chart'

import { t } from '@utils/translations'

import { useClassNames } from './bar-charts-card.style'

const filterSettings = {
  SIX_MONTHS: 'SIX_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  ALL_MONTHS: 'ALL_MONTHS',
}

export const BarChartsCard = observer(({ isRevenue, data }) => {
  const { classes: classNames } = useClassNames()

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
    <div className={classNames.mainWrapper}>
      <Paper className={classNames.cardWrapper}>
        <div className={classNames.cardHeaderWrapper}>
          <Typography>{isRevenue ? t(TranslationKey.Revenue) : t(TranslationKey['Website traffic'])}</Typography>
          <div className={classNames.barStatusesWrapper}>
            <div className={classNames.barStatusWrapper}>
              <FiberManualRecordRoundedIcon color="primary" />
              <Typography className={classNames.cardTitle}>
                {isRevenue ? t(TranslationKey['gross profit']) : t(TranslationKey['page view'])}
              </Typography>
            </div>
            <div className={classNames.barStatusWrapper}>
              <FiberManualRecordRoundedIcon classes={{ root: classNames.indicator }} />
              <Typography className={classNames.cardTitle}>
                {isRevenue ? t(TranslationKey['net income']) : t(TranslationKey['unique users'])}
              </Typography>
            </div>
          </div>
        </div>

        <TwoBarsChart
          data={filteredData}
          xRowKey={'month'}
          firstBarKey={isRevenue ? 'grossIncome' : 'webpageVisits'}
          secondBarKey={isRevenue ? 'pureIncome' : 'uniqueCustomers'}
        />

        <div className={classNames.buttonsWrapper}>
          <Button
            className={cx(classNames.button, {
              [classNames.selectedBtn]: curFilterSetting === filterSettings.SIX_MONTHS,
            })}
            variant="text"
            color="primary"
            onClick={() => setCurFilterSetting(filterSettings.SIX_MONTHS)}
          >
            {`6 ${t(TranslationKey.months)}`}
          </Button>
          <Button
            className={cx(classNames.button, {
              [classNames.selectedBtn]: curFilterSetting === filterSettings.TWELVE_MONTHS,
            })}
            variant="text"
            color="primary"
            onClick={() => setCurFilterSetting(filterSettings.TWELVE_MONTHS)}
          >
            {`12 ${t(TranslationKey.months)}`}
          </Button>
          <Button
            className={cx(classNames.button, {
              [classNames.selectedBtn]: curFilterSetting === filterSettings.ALL_MONTHS,
            })}
            variant="text"
            color="primary"
            onClick={() => setCurFilterSetting(filterSettings.ALL_MONTHS)}
          >
            {t(TranslationKey['All time'])}
          </Button>
        </div>
      </Paper>
    </div>
  )
})
