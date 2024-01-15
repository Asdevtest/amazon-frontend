/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo, useState } from 'react'

import { Divider } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { formatDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IOrderBoxBatch } from '@typings/order-box'
import { IShop } from '@typings/shop'

import { useStyles } from './product-and-batch-modal.style'

import { BatchInfoModal } from '../batch-info-modal'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'
import { infoModalConfig, switcherSettings } from './product-and-batch-modal.config'
import { IProductWithOrder, ProductAndBatchModalSwitcherConditions } from './product-and-batch-modal.type'

export interface ProductAndBatchModalProps {
  changeSwitcher: () => void
  currentSwitch: ProductAndBatchModalSwitcherConditions
  shops: IShop[]
  selectedProduct: IProductWithOrder
  batches: IOrderBoxBatch[]
  openModal: boolean
  setOpenModal: () => void
  currentBatch?: IOrderBoxBatch
  getCurrentBatch: (guid: string) => void
}

export const ProductAndBatchModal: FC<ProductAndBatchModalProps> = memo(props => {
  const {
    selectedProduct,
    shops,
    batches,
    openModal,
    setOpenModal,
    currentBatch,
    getCurrentBatch,
    currentSwitch,
    changeSwitcher,
  } = props

  const { classes: styles } = useStyles()

  const [showBatchModal, setShowBatchModal] = useState(false)

  const handleShowModalBatchModal = () => {
    setShowBatchModal(!showBatchModal)
  }

  const handleOpenBatchModal = (guid: string) => {
    getCurrentBatch(guid)
    handleShowModalBatchModal()
  }

  const selectedProductShop = shops?.find(shop => shop._id === selectedProduct?.shopId)
  const switchCurrentCondition = currentSwitch === ProductAndBatchModalSwitcherConditions.BATCH_DATA
  const columns = switchCurrentCondition ? batchDataColumns(handleOpenBatchModal) : aboutProductsColumns
  const rows = switchCurrentCondition ? batches : selectedProduct?.orders
  const updatedText = `${t(TranslationKey.Updated)}: ${formatDateTime(selectedProduct?.updatedAt)}`

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <div className={styles.root}>
          <div className={styles.modalHeader}>
            <p className={styles.title}>{t(TranslationKey['Product information'])}</p>
            <p className={styles.updated}>{updatedText}</p>
          </div>

          <Divider />

          <div className={styles.subHeader}>
            <SlideshowGallery slidesToShow={2} files={selectedProduct?.images} />

            <p className={styles.amazonTitle}>{selectedProduct.amazonTitle}</p>

            <div>
              {selectedProductShop && (
                <p className={styles.shopName}>
                  <span className={styles.showAttributeName}>{t(TranslationKey.Shop)}:</span> {selectedProductShop.name}
                </p>
              )}
              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={selectedProduct.asin} />
              <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={selectedProduct.skuByClient} />
            </div>
          </div>

          <Divider />

          <div className={styles.fieldWrapper}>
            {infoModalConfig(selectedProduct).map((field, index) => (
              <Field
                key={index}
                containerClasses={styles.field}
                labelClasses={styles.infoHeader}
                label={field.title}
                inputComponent={field.element}
              />
            ))}
          </div>

          <CustomSwitcher
            fullWidth
            switcherSettings={switcherSettings}
            condition={currentSwitch}
            switchMode="medium"
            changeConditionHandler={changeSwitcher}
          />

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              getRowHeight={() => '40px'}
              slots={{}}
              rows={rows || []}
              getRowId={({ _id }: { _id: string }) => _id}
              columns={columns}
            />
          </div>
        </div>
      </Modal>

      {showBatchModal && (
        // @ts-ignore */
        <BatchInfoModal batch={currentBatch} openModal={showBatchModal} setOpenModal={handleShowModalBatchModal} />
      )}
    </>
  )
})
