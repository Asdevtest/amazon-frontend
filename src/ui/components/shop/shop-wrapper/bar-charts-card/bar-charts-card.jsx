import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

import React, {useEffect, useState} from 'react'

import {Paper, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {TwoBarsChart} from '@components//charts/two-bars-chart/two-bars-chart'
import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './bar-charts-card.style'

const filterSettings = {
  SIX_MONTHS: 'SIX_MONTHS',
  TWELVE_MONTHS: 'TWELVE_MONTHS',
  ALL_MONTHS: 'ALL_MONTHS',
}

export const BarChartsCard = observer(({isRevenue, data}) => {
  const classNames = useClassNames()

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
    <div className={classNames.mainWrapper}>
      <Paper className={classNames.cardWrapper}>
        <div className={classNames.cardHeaderWrapper}>
          <Typography>{isRevenue ? 'Доход' : 'Трафик сайта'}</Typography>
          <div className={classNames.barStatusesWrapper}>
            <div className={classNames.barStatusWrapper}>
              <FiberManualRecordRoundedIcon color="primary" />
              <Typography className={classNames.cardTitle}>
                {isRevenue ? 'валовый доход' : 'просмотр страницы'}
              </Typography>
            </div>
            <div className={classNames.barStatusWrapper}>
              <FiberManualRecordRoundedIcon classes={{root: classNames.indicator}} />
              <Typography className={classNames.cardTitle}>
                {isRevenue ? 'чистая прибыль' : 'уникальные пользователи'}
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
            className={clsx(classNames.button, {
              [classNames.selectedBtn]: curFilterSetting === filterSettings.SIX_MONTHS,
            })}
            variant="text"
            color="primary"
            onClick={() => setCurFilterSetting(filterSettings.SIX_MONTHS)}
          >
            {`6 ${t(TranslationKey.months)}`}
          </Button>
          <Button
            className={clsx(classNames.button, {
              [classNames.selectedBtn]: curFilterSetting === filterSettings.TWELVE_MONTHS,
            })}
            variant="text"
            color="primary"
            onClick={() => setCurFilterSetting(filterSettings.TWELVE_MONTHS)}
          >
            {`12 ${t(TranslationKey.months)}`}
          </Button>
          <Button
            className={clsx(classNames.button, {
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
