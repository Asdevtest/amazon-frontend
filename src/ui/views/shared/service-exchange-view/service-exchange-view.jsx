import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { CardVariant } from '@typings/enums/card-variant'

import { useStyles } from './service-exchange-view.style'

import { ServiceExchangeViewModel } from './service-exchange-view.model'

export const ServiceExchangeView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()

  const viewModel = useMemo(() => new ServiceExchangeViewModel({ history }), [])

  const isListPosition = viewModel.viewMode === tableViewMode.LIST
  const positionStyle = isListPosition ? styles.dashboardListWrapper : styles.dashboardCardWrapper
  const cardVariant = isListPosition ? CardVariant.List : CardVariant.Card
  return (
    <>
      <div className={styles.tablePanelWrapper}>
        <div className={styles.toggleBtnAndtaskTypeWrapper}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            specs={viewModel.specs}
            selectedSpec={viewModel.specOption}
            onChangeSpec={viewModel.onChangeSpec}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Performer, Title, Description"
          wrapperClassName={styles.searchInput}
          onSearch={viewModel.onSearchSubmit}
        />
      </div>

      <div
        className={positionStyle}
        onScroll={e => {
          viewModel.onScroll(e)
        }}
      >
        {viewModel.currentData.map(service => (
          <ServiceExchangeCard
            key={service._id}
            order
            service={service}
            variant={cardVariant}
            onClickButton={viewModel.onClickOrderBtn}
          />
        ))}
      </div>

      {!viewModel.currentData.length ? (
        <div className={styles.emptyTableWrapper}>
          <img src="/assets/icons/empty-table.svg" />
          <p className={styles.emptyTableText}>{t(TranslationKey.Missing)}</p>
        </div>
      ) : null}
    </>
  )
})
