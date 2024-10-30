import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './dashboard-info-card.style'

export const DashboardInfoCard = observer(
  ({ color, title, value, route, onClickViewMore, sectionIndex, sectionSubIndex, dataGridFilter }) => {
    const { classes: styles } = useStyles()

    return (
      SettingsModel.languageTag && (
        <div className={styles.root}>
          <div className={styles.circle} style={{ borderColor: color }}>
            <p className={styles.circleTitle}>{value || 0}</p>
          </div>
          <div className={styles.titleWrapper}>
            <p className={styles.title}>{title}</p>
          </div>
          {route ? (
            <div className={styles.subTitleWrapper}>
              <CustomButton onClick={() => onClickViewMore(route, dataGridFilter)}>
                {t(TranslationKey['View more'])}
              </CustomButton>
            </div>
          ) : null}
        </div>
      )
    )
  },
)
