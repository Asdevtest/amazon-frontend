import { observer } from 'mobx-react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './dashboard-info-card.style'

export const DashboardInfoCard = observer(
  ({ color, title, value, route, onClickViewMore, sectionIndex, sectionSubIndex, dataGridFilter }) => {
    const { classes: classNames } = useClassNames()

    return (
      SettingsModel.languageTag && (
        <Paper className={classNames.root}>
          <div className={classNames.circle} style={{ borderColor: color }}>
            <Typography className={classNames.circleTitle}>{value || 0}</Typography>
          </div>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.title}>{title}</Typography>
          </div>
          {route ? (
            <div className={classNames.subTitleWrapper}>
              <Button
                tooltipInfoContent={
                  sectionIndex === 0 && sectionSubIndex === 0 && t(TranslationKey['Open the appropriate section'])
                }
                className={classNames.subTitle}
                onClick={() => onClickViewMore(route, dataGridFilter)}
              >
                {t(TranslationKey['View more'])}
              </Button>
            </div>
          ) : undefined}
        </Paper>
      )
    )
  },
)
