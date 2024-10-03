import { FC, memo, useEffect, useState } from 'react'

import { Divider } from '@mui/material'
import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IBatch } from '@typings/models/batches/batch'
import { IProduct } from '@typings/models/products/product'
import { IShop } from '@typings/models/shops/shop'

import { useStyles } from './product-and-batch-modal.style'

import { BatchInfoModal } from '../batch-info-modal'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'
import { infoModalConfig, switcherSettings } from './product-and-batch-modal.config'
import { ProductAndBatchModalSwitcherConditions } from './product-and-batch-modal.type'

export interface ProductAndBatchModalProps {
  currentSwitch: ProductAndBatchModalSwitcherConditions
  shops: IShop[]
  selectedProduct: IProduct
  batches: IBatch[]
  currentBatch?: IBatch
  getCurrentBatch: (id: string) => void
  onChangeSwitcher: (value: string) => void
  onClickMyOrderModal: (id: string) => void
  onOpenProductDataModal: (onAmazon: boolean) => void
  patchActualShippingCostBatch: (id: string, value: number) => void
}

export const ProductAndBatchModal: FC<ProductAndBatchModalProps> = memo(props => {
  const {
    selectedProduct,
    shops,
    batches,
    currentBatch,
    getCurrentBatch,
    currentSwitch,
    onChangeSwitcher,
    onClickMyOrderModal,
    onOpenProductDataModal,
    patchActualShippingCostBatch,
  } = props

  const { classes: styles } = useStyles()

  const [showBatchModal, setShowBatchModal] = useState(false)
  const [rows, setRows] = useState<GridRowModel[]>([])

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

  const handleRowClick = (id: string) => {
    if (switchCurrentCondition) {
      return
    }

    onClickMyOrderModal(id)
  }

  useEffect(() => {
    setRows(switchCurrentCondition ? batches : selectedProduct?.orders)
  }, [switchCurrentCondition, batches])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.title}>{t(TranslationKey['Product information'])}</p>

          <div className={styles.updatedContainer}>
            <p className={styles.updatedText}>{`${t(TranslationKey.Updated)}:`}</p>
            <p className={styles.updatedTitle}>{formatShortDateTime(selectedProduct?.updatedAt)}</p>
          </div>
        </div>

        <Divider />

        <div className={styles.subHeader}>
          <SlideshowGallery slidesToShow={2} files={selectedProduct?.images} />

          <p className={styles.amazonTitle}>{selectedProduct?.amazonTitle}</p>

          <div className={styles.additionInfo}>
            <div className={styles.shopContainer}>
              <p className={styles.shopName}>{`${t(TranslationKey.Shop)}:`}</p>
              <p className={styles.shopValue}>{selectedProductShop?.name || t(TranslationKey['Not available'])}</p>
            </div>
            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={selectedProduct?.asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={selectedProduct?.skuByClient} />
          </div>
        </div>

        <Divider />

        <div className={styles.fields}>
          {infoModalConfig(selectedProduct, onOpenProductDataModal).map((field, index) => (
            <div key={index} className={styles.field}>
              <p className={styles.fieldTitle}>{field.title}</p>
              {field.element()}
            </div>
          ))}
        </div>

        <CustomRadioButton
          options={switcherSettings}
          value={currentSwitch}
          onChange={e => onChangeSwitcher(e.target.value)}
        />

        <div className={styles.tableWrapper}>
          <CustomDataGrid
            sortingMode="client"
            paginationMode="client"
            rows={rows || []}
            columns={columns}
            getRowId={({ _id }: GridRowModel) => _id}
            getRowHeight={() => 'auto'}
            slotProps={{
              baseTooltip: {
                title: t(TranslationKey.Filter),
              },
            }}
            onRowClick={({ id }: GridRowModel) => handleRowClick(id)}
          />
        </div>
      </div>

      {showBatchModal ? (
        // @ts-ignore
        <BatchInfoModal
          batch={currentBatch}
          openModal={showBatchModal}
          setOpenModal={handleShowModalBatchModal}
          patchActualShippingCostBatch={patchActualShippingCostBatch}
        />
      ) : null}
    </>
  )
})
