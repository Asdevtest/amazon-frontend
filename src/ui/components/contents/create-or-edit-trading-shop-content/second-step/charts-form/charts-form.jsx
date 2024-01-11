import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { TwoBarsChart } from '@components/shared/charts/two-bars-chart/two-bars-chart'

import { t } from '@utils/translations'

import { useClassNames } from './charts-form.style'

const filterSettings = {
  SIX_MONTHS: 'SIX_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  ALL_MONTHS: 'ALL_MONTHS',
}

export const ChartsForm = observer(({ data, isRevenueBeggin }) => {
  const { classes: classNames } = useClassNames()

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
    <div className={classNames.cardWrapper}>
      <div className={classNames.cardHeaderWrapper}>
        <div className={classNames.selectionBtns}>
          <Button
            className={cx(classNames.selectionBtn, {
              [classNames.curSelectionBtn]: isRevenue,
            })}
            variant="text"
            color="primary"
            onClick={() => setIsRevenue(true)}
          >
            {t(TranslationKey.Revenue)}
          </Button>
          <Button
            className={cx(classNames.selectionBtn, {
              [classNames.curSelectionBtn]: !isRevenue,
            })}
            variant="text"
            color="primary"
            onClick={() => setIsRevenue(false)}
          >
            {t(TranslationKey['Website traffic'])}
          </Button>
        </div>

        <div className={classNames.barStatusesWrapper}>
          <div className={classNames.barStatusWrapper}>
            <FiberManualRecordRoundedIcon color="primary" />
            <Typography className={classNames.cardTitle}>
              {isRevenue
                ? t(TranslationKey['Gross income']).toLowerCase()
                : t(TranslationKey['View page']).toLowerCase()}
            </Typography>
          </div>
          <div className={classNames.barStatusWrapper}>
            <FiberManualRecordRoundedIcon classes={{ root: classNames.indicator }} />
            <Typography className={classNames.cardTitle}>
              {isRevenue
                ? t(TranslationKey['Pure profit']).toLowerCase()
                : t(TranslationKey['Unique visitors']).toLowerCase()}
            </Typography>
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

      <div className={classNames.buttonsWrapper}>
        <Button
          className={cx(classNames.button, {
            [classNames.selectedBtn]: curFilterSetting === filterSettings.SIX_MONTHS,
          })}
          variant="text"
          onClick={() => setCurFilterSetting(filterSettings.SIX_MONTHS)}
        >
          {`6 ${t(TranslationKey.months)}`}
        </Button>
        <Button
          className={cx(classNames.button, {
            [classNames.selectedBtn]: curFilterSetting === filterSettings.TWELVE_MONTHS,
          })}
          variant="text"
          onClick={() => setCurFilterSetting(filterSettings.TWELVE_MONTHS)}
        >
          {`12 ${t(TranslationKey.months)}`}
        </Button>
        <Button
          className={cx(classNames.button, {
            [classNames.selectedBtn]: curFilterSetting === filterSettings.ALL_MONTHS,
          })}
          variant="text"
          onClick={() => setCurFilterSetting(filterSettings.ALL_MONTHS)}
        >
          {t(TranslationKey['All time'])}
        </Button>
      </div>
    </div>
  )
})
