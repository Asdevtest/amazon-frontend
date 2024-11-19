import { Empty, Spin } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
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
          onSearch={viewModel.onClickSubmitSearch}
        />

        <SupplierCard supplier={viewModel.supplier} showViewMore={false} />

        <div
          className={cx(styles.content, { [styles.emptyProducts]: !viewModel.products.length })}
          onScroll={viewModel.onScroll}
        >
          {viewModel.products.length ? (
            viewModel.products.map(product => (
              <SupplierProductCard key={product._id} product={product} onSubmit={viewModel.onSelectSupplierCard} />
            ))
          ) : (
            <Empty />
          )}

          <CardsFilter showFilter={!!viewModel.products.length} onSubmit={viewModel.onSubmitFilters} />

          <Spin spinning={viewModel.loading} size="large" className={styles.loading} />
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
