import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './dashboard-widgets-card.style'

import { DashboardListOfAnyCard } from '../dashboard-list-of-any-card'
import { DashboardOneLineCardsList } from '../dashboard-one-line-cards-list'
import { DashboardSingleCard } from '../dashboard-single-card'
import { DashboardSingleCardWithButton } from '../dashboard-single-card-with-button'

export const DashboardWidgetsCard = observer(({ config, valuesData, onClickViewMore }) => {
  const { classes: styles } = useStyles()

  return (
    <div>
      <DashboardOneLineCardsList
        config={config.inventory}
        configSubTitle={t(TranslationKey['Your product list data'])}
        valuesData={valuesData}
        onClickViewMore={onClickViewMore}
      />
      <div className={styles.bottomWidgetsWrapper}>
        <DashboardListOfAnyCard
          config={config.orders}
          configSubTitle={t(TranslationKey['Your order data'])}
          valuesData={valuesData}
          onClickViewMore={onClickViewMore}
        />
        <div className={styles.bottomRightSideWidgetsWrapper}>
          <div className={styles.bottomRightSideTopWidgetsWrapper}>
            <div>
              <Typography className={styles.cardListTitle}>{config.boxes.title}</Typography>
              <Typography className={styles.cardListSubTitle}>{t(TranslationKey['Boxes data'])}</Typography>
              <div className={styles.sectionWrapper}>
                {config.boxes.items.map(item => (
                  <DashboardSingleCard
                    key={item.dataKey}
                    item={item}
                    valuesData={valuesData}
                    onClickViewMore={onClickViewMore}
                  />
                ))}
              </div>
            </div>
          </div>

          <DashboardSingleCardWithButton
            horizontal
            config={config.freelance}
            valuesData={valuesData}
            buttonText={t(TranslationKey['Create a request'])}
            configSubTitle={t(TranslationKey['Request data'])}
            onClickViewMore={onClickViewMore}
          />
        </div>
      </div>
    </div>
  )
})
