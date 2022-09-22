/* eslint-disable no-unused-vars */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import React from 'react'

import {CircularProgress, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {useClassNames} from '@components/dashboards/dashboard-list-of-any-card/dashboard-list-of-any-card.style'

import {t} from '@utils/translations'

export const DashboardListOfAnyCard = ({config, configSubTitle, valuesData, onClickViewMore}) => {
  const classNames = useClassNames()

  const CardItem = ({item}) => (
    <div className={classNames.cardWrapper} onClick={() => onClickViewMore(item.route, item.dataGridFilter)}>
      <Typography className={classNames.cardSubTitle}>{item.title}</Typography>
      <div className={classNames.cardValueWrapper}>
        <Typography className={classNames.cardValueTitle}>
          {valuesData[item.dataKey] ? (
            valuesData[item.dataKey]
          ) : (
            <CircularProgress color="success" thickness={2} size={16} />
          )}
        </Typography>
        <ArrowForwardIosIcon fontSize="small" />
      </div>
    </div>
  )

  return (
    <div className={classNames.cardListWrapper}>
      <Typography className={classNames.cardListTitle}>{config.title}</Typography>
      <Typography className={classNames.cardListSubTitle}>{configSubTitle}</Typography>
      <div className={classNames.cardsWrapper}>
        {config.items.map(item => (
          <CardItem key={item.dataKey} item={item} />
        ))}
      </div>
    </div>
  )
}
