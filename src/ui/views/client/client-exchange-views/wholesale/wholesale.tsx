import { RadioChangeEvent } from 'antd'
import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { DynamicVirtualList } from '@components/shared/dynamic-virtual-list'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { CardsFilter } from '@views/shared/supplier-view/cards-filter'

import { t } from '@utils/translations'

import { ISupplierCard, ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './wholesale.style'

import { WholesaleTabs, generateWholesaleTabs } from './wholesale.config'
import { WholesaleViewModel } from './wholesale.model'

export const WholesaleView = observer(() => {
  const { classes: styles } = useStyles()
  const [wholesaleTab, setWholesaleTab] = useState<WholesaleTabs>(WholesaleTabs.Cards)

  const isSupplierMode = wholesaleTab === WholesaleTabs.Suppliers
  const viewModel = useMemo(() => new WholesaleViewModel(isSupplierMode), [isSupplierMode])

  const handleChangeWholesaleTab = (event: RadioChangeEvent) => {
    setWholesaleTab(event.target.value)
  }

  const listClassName = isSupplierMode ? styles.suppliers : styles.products

  return (
    <>
      <div className="viewWrapper">
        <div className={styles.header}>
          <CustomRadioButton
            size="large"
            options={generateWholesaleTabs()}
            value={wholesaleTab}
            onChange={handleChangeWholesaleTab}
          />
          <CustomInputSearch
            allowClear
            enterButton
            size="large"
            placeholder="Search"
            onSearch={viewModel.onSearchSubmit}
          />
        </div>

        <div className={styles.container}>
          <DynamicVirtualList<ISupplierExchange | ISupplierCard>
            listClassName={listClassName}
            data={viewModel.items}
            itemContent={({ item }) =>
              isSupplierMode ? (
                <SupplierCard supplier={item as ISupplierExchange} />
              ) : (
                <SupplierProductCard product={item as ISupplierCard} onSubmit={viewModel.onSelectSupplierCard} />
              )
            }
            onScrollEnd={viewModel.loadMoreData}
          />

          <CardsFilter
            onlyExchangeCategories
            loading={viewModel.loading}
            showFilter={viewModel.showFilter && !isSupplierMode}
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
