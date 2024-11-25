import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { DynamicVirtualList } from '@components/shared/dynamic-virtual-list'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './wholesale.style'

import { generateWholesaleTabs } from './wholesale.config'
import { WholesaleViewModel } from './wholesale.model'

export const WholesaleView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WholesaleViewModel(), [])

  return (
    <>
      <div className="viewWrapper">
        <div className={styles.header}>
          <CustomRadioButton
            size="large"
            options={generateWholesaleTabs()}
            value={viewModel.wholesaleTab}
            onChange={viewModel.onChangeWholesaleTab}
          />
          <CustomInputSearch
            allowClear
            enterButton
            size="large"
            placeholder="Search"
            onSearch={viewModel.onSearchSubmit}
          />
        </div>

        <DynamicVirtualList<ISupplierExchange | ISupplierCard>
          listClassName={viewModel.supplierMode ? styles.suppliers : styles.products}
          data={viewModel.supplierMode ? viewModel.suppliers : viewModel.products}
          itemContent={({ item }) =>
            viewModel.supplierMode ? (
              <SupplierCard supplier={item as ISupplierExchange} />
            ) : (
              <SupplierProductCard product={item as ISupplierCard} onSubmit={viewModel.onSelectSupplierCard} />
            )
          }
          onScrollEnd={viewModel.loadMoreData}
        />
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
