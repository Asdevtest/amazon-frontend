/* eslint-disable no-unused-vars */
import React from 'react'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Typography } from '@mui/material'

import { useClassNames } from '@components/dashboards/dashboard-list-of-any-card/dashboard-list-of-any-card.style'

import { t } from '@utils/translations'

export const DashboardListOfAnyCard = ({ config, configSubTitle, valuesData, onClickViewMore }) => {
  const { classes: classNames } = useClassNames()

  const CardItem = ({ item }) => (
    <div className={classNames.cardWrapper} onClick={() => onClickViewMore(item.route, item.dataGridFilter)}>
      <Typography className={classNames.cardSubTitle}>{item.title}</Typography>
      <div className={classNames.cardValueWrapper}>
        <Typography className={classNames.cardValueTitle}>
          {valuesData[item.dataKey] && valuesData[item.dataKey]}
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
