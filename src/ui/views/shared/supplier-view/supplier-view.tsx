import { Spin } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { InfiniteScroll } from '@components/shared/infinite-scroll'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './supplier-view.style'

import { CardsFilter } from './cards-filter'
import { SupplierViewModel } from './supplier-view.model'

export const SupplierView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new SupplierViewModel(history), [])

  return (
    <>
      <div className="viewWrapper">
        <CustomInputSearch
          allowClear
          enterButton
          size="large"
          placeholder="Search"
          onSearch={viewModel.onSearchSubmit}
        />

        <SupplierCard supplier={viewModel.supplier} showViewMore={false} />

        <InfiniteScroll
          className={styles.products}
          data={viewModel.products}
          itemContent={({ item }) => <SupplierProductCard product={item} onSubmit={viewModel.onSelectSupplierCard} />}
          onScrollEnd={viewModel.loadMoreData}
        >
          <CardsFilter
            showFilter={!!viewModel.products.length}
            onSubmit={viewModel.onFilterSubmit}
            onReset={viewModel.onResetOptions}
          />
          <Spin spinning={viewModel.loading} size="large" className={styles.loading} />
        </InfiniteScroll>
      </div>

      <Modal openModal={viewModel.showSelectShopsModal} setOpenModal={viewModel.onToggleSelectShopsModal}>
        <SelectShopsForm
          title={t(TranslationKey['Link a store to a product'])}
          onSubmit={viewModel.onAddToInventory}
          onClose={viewModel.onToggleSelectShopsModal}
        />
      </Modal>
    </>
  )
})
