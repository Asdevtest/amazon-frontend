import { observer } from 'mobx-react'
import { useState } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { ServiceExchangeCardList } from '@components/cards/service-exchange-card-list'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { useStyles } from './service-exchange-view.style'

import { ServiceExchangeViewModel } from './service-exchange-view.model'

export const ServiceExchangeView = observer(({ history }) => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ServiceExchangeViewModel({ history }))

  const isListPosition = viewModel.viewMode === tableViewMode.LIST

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
        className={styles.dashboardCardWrapper}
        onScroll={e => {
          const element = e.target
          const scrollTop = element?.scrollTop
          const containerHeight = element?.clientHeight
          const contentHeight = element?.scrollHeight

          if (contentHeight - (scrollTop + containerHeight) < 200) {
            viewModel.loadMoreDataHadler()
          }
        }}
      >
        {viewModel.currentData.map(service =>
          isListPosition ? (
            <ServiceExchangeCardList
              key={service._id}
              order
              service={service}
              onClickButton={viewModel.onClickOrderBtn}
            />
          ) : (
            <ServiceExchangeCard key={service._id} order service={service} onClickButton={viewModel.onClickOrderBtn} />
          ),
        )}
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
