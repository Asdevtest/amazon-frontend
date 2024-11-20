import { Empty, Spin } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { SupplierCard, SupplierProductCard } from '@components/shared/supplier'

import { t } from '@utils/translations'

import { useStyles } from './wholesale.style'

import { generateWholesaleTabs } from './wholesale.config'
import { WholesaleViewModel } from './wholesale.model'

export const WholesaleView = observer(() => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new WholesaleViewModel(), [])

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [viewModel.supplierMode])

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
            onSearch={viewModel.onClickSubmitSearch}
          />
        </div>

        <div
          ref={contentRef}
          className={cx(styles.content, {
            [styles.products]: !viewModel.supplierMode,
            [styles.emptyProducts]: !viewModel.products.length,
          })}
          onScroll={viewModel.onScroll}
        >
          {viewModel.isEmpty ? (
            <Empty className={styles.empty} />
          ) : viewModel.supplierMode ? (
            viewModel.suppliers.map(supplier => <SupplierCard key={supplier._id} supplier={supplier} />)
          ) : (
            viewModel.products.map(product => (
              <SupplierProductCard key={product._id} product={product} onSubmit={viewModel.onSelectSupplierCard} />
            ))
          )}
        </div>

        <Spin spinning={viewModel.loading} size="large" className={styles.loading} />
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
