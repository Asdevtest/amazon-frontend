import { observer } from 'mobx-react'
import { useState } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card/service-exchange-card'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { CardVariant } from '@typings/enums/card-variant'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './my-services-view.style'

import { MyServicesViewModel } from './my-services-view.model'

export const MyServicesView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new MyServicesViewModel(history))

  const isListPosition = viewModel.viewMode === tableViewMode.LIST
  const positionStyle = isListPosition ? styles.dashboardListWrapper : styles.dashboardCardWrapper
  const cardVariant = isListPosition ? CardVariant.List : CardVariant.Card

  return (
    <>
      <div className={styles.flexContainer}>
        <div className={styles.flexContainer}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            specs={viewModel.userInfo?.allowedSpec}
            selectedSpec={viewModel.specOption}
            onChangeSpec={viewModel.onChangeSpec}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title, Description"
          onSearch={viewModel.onSearchSubmit}
        />

        <div className={styles.flexContainer}>
          <CustomButton size="large" onClick={viewModel.onToggleArchive}>
            {t(TranslationKey[viewModel.archive ? 'To the actual' : 'Open archive'])}
          </CustomButton>

          <CustomButton size="large" type="primary" onClick={viewModel.onClickCreateService}>
            {t(TranslationKey['Create a service'])}
          </CustomButton>
        </div>
      </div>

      <div className={positionStyle}>
        {viewModel.currentData.map((service, serviceKey) => (
          <ServiceExchangeCard
            key={serviceKey}
            service={service}
            pathname={history?.location?.pathname}
            variant={cardVariant}
            onClickButton={viewModel.onClickOpenButton}
          />
        ))}
      </div>

      {!viewModel.currentData.length && (
        <div className={styles.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <p className={styles.emptyTableText}>{t(TranslationKey.Missing)}</p>
        </div>
      )}
    </>
  )
})
