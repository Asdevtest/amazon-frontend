/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo, useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Divider } from '@mui/material'
import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { SeparatorIcon } from '@components/shared/svg-icons'

import { formatShortDateTime } from '@utils/date-time'
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
  currentSwitch: ProductAndBatchModalSwitcherConditions
  shops: IShop[]
  selectedProduct: IProductWithOrder
  batches: IOrderBoxBatch[]
  openModal: boolean
  setOpenModal: () => void
  currentBatch?: IOrderBoxBatch
  getCurrentBatch: (id: string) => void
  onChangeSwitcher: () => void
  onClickMyOrderModal: (id: string) => void
  onClickInTransferModal: (id: string) => void
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
    onChangeSwitcher,
    onClickMyOrderModal,
    onClickInTransferModal,
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
  const handleRowClick = (id: string) => {
    if (switchCurrentCondition) {
      return
    }

    onClickMyOrderModal(id)
  }

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
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

            <p className={styles.amazonTitle}>{selectedProduct.amazonTitle}</p>

            <div className={styles.additionInfo}>
              <div className={styles.shopContainer}>
                <p className={styles.shopName}>{`${t(TranslationKey.Shop)}:`}</p>
                <p className={styles.shopValue}>{selectedProductShop?.name || t(TranslationKey['Not available'])}</p>
              </div>
              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={selectedProduct.asin} />
              <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={selectedProduct.skuByClient} />
            </div>
          </div>

          <Divider />

          <div className={styles.fields}>
            {infoModalConfig(selectedProduct, onClickInTransferModal).map((field, index) => (
              <div key={index} className={styles.field}>
                <p className={styles.fieldTitle}>{field.title}</p>
                {field.element()}
              </div>
            ))}
          </div>

          <CustomSwitcher
            fullWidth
            switcherSettings={switcherSettings}
            condition={currentSwitch}
            switchMode="medium"
            changeConditionHandler={onChangeSwitcher}
          />

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              sortingMode="client"
              paginationMode="client"
              rows={rows || []}
              columns={columns}
              getRowId={({ _id }: GridRowModel) => _id}
              getRowHeight={() => 'auto'}
              slots={{
                columnMenuIcon: FilterAltOutlinedIcon,
                columnMenu: DataGridCustomColumnMenuComponent,
                columnResizeIcon: SeparatorIcon,
              }}
              slotProps={{
                baseTooltip: {
                  title: t(TranslationKey.Filter),
                },
              }}
              onRowClick={({ id }: GridRowModel) => handleRowClick(id)}
            />
          </div>
        </div>
      </Modal>

      {showBatchModal && (
        // @ts-ignore
        <BatchInfoModal batch={currentBatch} openModal={showBatchModal} setOpenModal={handleShowModalBatchModal} />
      )}
    </>
  )
})
