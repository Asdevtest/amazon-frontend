import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

import React from 'react'

import {Paper, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'

import {BarsChart} from '../charts/bars-chart/bars-chart'
// import {TranslationKey} from '@constants/translations/translation-key'
// import {Button} from '@components/buttons/button'
// import {t} from '@utils/translations'
import {useClassNames} from './bar-charts-card.style'

export const BarChartsCard = observer(({isRevenue, data}) => {
  const classNames = useClassNames()
  console.log(isRevenue)
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

        <BarsChart data={data} />

        <div className={classNames.buttonsWrapper}>
          <Button className={clsx(classNames.button, {[classNames.selectedBtn]: true})} variant="text" color="primary">
            {'6 месяцев'}
          </Button>
          <Button className={clsx(classNames.button, {[classNames.selectedBtn]: true})} variant="text" color="primary">
            {'12 месяцев'}
          </Button>
          <Button className={clsx(classNames.button, {[classNames.selectedBtn]: true})} variant="text" color="primary">
            {'Все время'}
          </Button>
        </div>
      </Paper>
    </div>
  )
})
