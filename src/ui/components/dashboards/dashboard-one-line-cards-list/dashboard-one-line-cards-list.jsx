/* eslint-disable no-unused-vars */
import React from 'react'

import {CircularProgress, Typography} from '@material-ui/core'

import {InventoryIcon} from '@constants/navbar-svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {useClassNames} from '@components/dashboards/dashboard-one-line-cards-list/dashboard-one-line-cards-list.style'

import {t} from '@utils/translations'

export const DashboardOneLineCardsList = ({config, configSubTitle, valuesData, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.cardListWrapper}>
      <div className={classNames.cardHeaderWrapper}>
        <div>
          <Typography className={classNames.cardListTitle}>{config.title}</Typography>
          <Typography className={classNames.cardListSubTitle}>{configSubTitle}</Typography>
        </div>
        <Button success onClick={() => onClickViewMore(config.route)}>
          {t(TranslationKey['Add product'])}
        </Button>
      </div>

      <div className={classNames.cardsWrapper}>
        {config.items.map(item => (
          <div key={item.dataKey} className={classNames.cardWrapper} onClick={() => onClickViewMore(item.route)}>
            <InventoryIcon classes={{root: classNames.icon}} />
            <div className={classNames.cardSubWrapper}>
              <Typography className={classNames.cardSubTitle}>{item.title}</Typography>
              <Typography className={classNames.cardValueTitle}>
                {valuesData[item.dataKey] ? (
                  valuesData[item.dataKey]
                ) : (
                  <CircularProgress color="success" thickness={2} />
                )}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
