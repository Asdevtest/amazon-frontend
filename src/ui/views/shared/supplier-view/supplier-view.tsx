import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CardsFilter } from '@components/shared/cards-filter'
import { CustomButton } from '@components/shared/custom-button'
import { DynamicVirtualList } from '@components/shared/dynamic-virtual-list'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './supplier-view.style'

import { SupplierViewModel } from './supplier-view.model'

export const SupplierView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new SupplierViewModel(history), [])

  return (
    <>
      <div className="viewWrapper">
        <SupplierCard supplier={viewModel.supplier} showViewMore={false} />

        <CustomButton
          size="large"
          type="primary"
          className={styles.addInventoryBtn}
          onClick={viewModel.onToggleSelectShopsModal}
        >
          {t(TranslationKey['Add to inventory'])}
        </CustomButton>

        <div className={styles.productsWrapper}>
          <DynamicVirtualList<ISupplierCard>
            checkboxes
            listClassName={cx(styles.products, {
              [styles.productsAll]: viewModel.productsAll,
              [styles.productsBig]: viewModel.productsBig,
            })}
            data={viewModel.products}
            itemContent={({ item }) => (
              <SupplierProductCard
                gorizontal={viewModel.productsBig}
                product={item}
                onSubmit={viewModel.onSelectSupplierCard}
              />
            )}
            onScrollEnd={viewModel.loadMoreData}
            onChangeCheckbox={viewModel.onChangeSupplierCards}
          />

          <CardsFilter
            onlyExchangeCategories
            loading={viewModel.loading}
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
