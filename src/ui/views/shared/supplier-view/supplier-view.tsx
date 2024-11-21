import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { DynamicVirtualList } from '@components/shared/dynamic-virtual-list'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './supplier-view.style'

import { CardsFilter } from './cards-filter'
import { SupplierViewModel } from './supplier-view.model'

export const SupplierView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
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

        <div className={styles.productsWrapper}>
          <DynamicVirtualList<ISupplierCard>
            listClassName={styles.products}
            data={viewModel.products}
            itemContent={({ item }) => <SupplierProductCard product={item} onSubmit={viewModel.onSelectSupplierCard} />}
            onScrollEnd={viewModel.loadMoreData}
          />

          <CardsFilter
            showFilter={viewModel.showFilter}
            filtersCount={viewModel.filtersCount}
            onSubmit={viewModel.onFilterSubmit}
            onReset={viewModel.onResetOptions}
          />
        </div>
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
