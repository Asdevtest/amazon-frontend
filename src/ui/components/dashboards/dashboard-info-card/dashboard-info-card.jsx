/* eslint-disable no-unused-vars */
import {Paper, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {t} from '@utils/translations'

import {useClassNames} from './dashboard-info-card.style'

export const DashboardInfoCard = observer(({color, title, value, route, onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    SettingsModel.languageTag && (
      <Paper className={classNames.root}>
        <div className={classNames.circle} style={{borderColor: color}}>
          <Typography className={classNames.circleTitle}>{value || 0}</Typography>
        </div>
        <div className={classNames.titleWrapper}>
          <Typography className={classNames.title}>{title}</Typography>
        </div>
        {route ? (
          <div className={classNames.subTitleWrapper}>
            <Typography className={classNames.subTitle} onClick={() => onClickViewMore(route)}>
              {t(TranslationKey['View more'])}
            </Typography>
          </div>
        ) : undefined}
      </Paper>
    )
  )
})
