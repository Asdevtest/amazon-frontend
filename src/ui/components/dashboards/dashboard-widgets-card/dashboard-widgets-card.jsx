import { observer } from 'mobx-react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './dashboard-widgets-card.style'

import { DashboardListOfAnyCard } from '../dashboard-list-of-any-card'
import { DashboardOneLineCardsList } from '../dashboard-one-line-cards-list'
import { DashboardSingleCard } from '../dashboard-single-card'
import { DashboardSingleCardWithButton } from '../dashboard-single-card-with-button'

export const DashboardWidgetsCard = observer(({ config, valuesData, onClickViewMore, onClickAddProduct }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div>
      <DashboardOneLineCardsList
        isClient
        config={config.inventory}
        configSubTitle={t(TranslationKey['Your product list data'])}
        valuesData={valuesData}
        onClickViewMore={onClickViewMore}
        onClickAddProduct={onClickAddProduct}
      />
      <div className={classNames.bottomWidgetsWrapper}>
        <DashboardListOfAnyCard
          config={config.orders}
          configSubTitle={t(TranslationKey['Your order data'])}
          valuesData={valuesData}
          onClickViewMore={onClickViewMore}
        />
        <div className={classNames.bottomRightSideWidgetsWrapper}>
          <div className={classNames.bottomRightSideTopWidgetsWrapper}>
            <div>
              <Typography className={classNames.cardListTitle}>{config.boxes.title}</Typography>
              <Typography className={classNames.cardListSubTitle}>{t(TranslationKey['Boxes data'])}</Typography>
              <div className={classNames.sectionWrapper}>
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
            {/* <DashboardSingleCardWithButton
              config={config.stores}
              valuesData={valuesData}
              buttonText={t(TranslationKey['Add shop'])}
              configSubTitle={t(TranslationKey['Store data'])}
              onClickViewMore={onClickViewMore}
            /> */}
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
