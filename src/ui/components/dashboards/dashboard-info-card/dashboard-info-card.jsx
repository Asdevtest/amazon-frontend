import { observer } from 'mobx-react'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './dashboard-info-card.style'

export const DashboardInfoCard = observer(
  ({ color, title, value, route, onClickViewMore, sectionIndex, sectionSubIndex, dataGridFilter }) => {
    const { classes: styles } = useStyles()

    return (
      SettingsModel.languageTag && (
        <Paper className={styles.root}>
          <div className={styles.circle} style={{ borderColor: color }}>
            <Typography className={styles.circleTitle}>{value || 0}</Typography>
          </div>
          <div className={styles.titleWrapper}>
            <Typography className={styles.title}>{title}</Typography>
          </div>
          {route ? (
            <div className={styles.subTitleWrapper}>
              <Button
                tooltipInfoContent={
                  sectionIndex === 0 && sectionSubIndex === 0 && t(TranslationKey['Open the appropriate section'])
                }
                className={styles.subTitle}
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
