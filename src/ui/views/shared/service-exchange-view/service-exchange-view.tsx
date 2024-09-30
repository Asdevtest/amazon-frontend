import { Empty, Spin } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'

import { ServiceExchangeCard } from '@components/cards/service-exchange-card'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { CardVariant } from '@typings/enums/card-variant'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './service-exchange-view.style'

import { ServiceExchangeViewModel } from './service-exchange-view.model'

export const ServiceExchangeView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new ServiceExchangeViewModel(history), [])

  const cardVariant = viewModel.viewMode === tableViewMode.LIST ? CardVariant.List : CardVariant.Card

  return (
    <>
      <div className={styles.flexRow}>
        <div className={styles.flexRow}>
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
          onSearch={viewModel.onClickSubmitSearch}
        />
      </div>

      {viewModel.announcements.length ? (
        <div className={styles.content} onScroll={viewModel.onScroll}>
          {viewModel.announcements.map(service => (
            <ServiceExchangeCard
              key={service._id}
              order
              // @ts-ignore
              service={service}
              variant={cardVariant}
              onClickButton={viewModel.onClickOrderBtn}
            />
          ))}
        </div>
      ) : (
        <Empty className={styles.empty} />
      )}

      {viewModel.loading ? <Spin size="large" className={styles.loading} /> : null}
    </>
  )
})
