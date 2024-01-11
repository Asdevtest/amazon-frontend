/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, ReactElement, memo } from 'react'

import { Divider } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './about-product-modal.style'

import { IProductAndBatchModalProps } from '../prodct-and-batch-modal/product-and-batch.modal'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { infoModalConfig, switcherSettings } from './about-product-modal-configs'
import { AboutProductSwitcher } from './about-product-switcher'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'

interface IAboutProductModal extends IProductAndBatchModalProps {
  setShowBatchModal: () => void
}

export const AboutProductModal: FC<IAboutProductModal> = memo(props => {
  const {
    selectedProduct,
    shops,
    batches,
    showLoading,
    setShowBatchModal,
    getCurrentBatch,
    currentSwitch,
    changeSwitcher,
    openModal,
    setOpenModal,
  } = props

  const { classes: styles } = useStyles()
  const fieldConfig = infoModalConfig({ selectedProduct })
  const selectedProductShop = shops?.find(shop => shop._id === selectedProduct?.shopId)

  const batchRowHandler = (guid: string) => {
    getCurrentBatch(guid)
    setShowBatchModal()
  }

  const switchCurrentCondition = currentSwitch === AboutProductSwitcher.BATCH_DATA

  const columns = switchCurrentCondition ? batchDataColumns(batchRowHandler) : aboutProductsColumns
  const rows = switchCurrentCondition ? batches : selectedProduct?.orders

  const updatedText = `${t(TranslationKey.Updated)}: ${formatDateTime(selectedProduct?.updatedAt)}`

  if (showLoading) {
    // @ts-ignore
    return <CircularProgressWithLabel />
  }

  return (
    <Modal contentWrapperClassName={styles.contentWrapperClassName} openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <div className={styles.modalHeader}>
          <p className={styles.title}>{t(TranslationKey['Product information'])}</p>
          <p className={styles.updated}>{updatedText}</p>
        </div>
        <Divider />
        <div className={styles.subHeader}>
          <PhotoAndFilesSlider withoutFiles customSlideHeight={92} files={selectedProduct?.images} />
          <p className={styles.amazonTitle}>{selectedProduct.amazonTitle}</p>
          <div>
            {selectedProductShop && (
              <p className={styles.shopName}>
                <span className={styles.showAttributeName}>{t(TranslationKey.Shop)}:</span> {selectedProductShop.name}
              </p>
            )}
            <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={selectedProduct.asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} asin={selectedProduct.skuByClient} />
          </div>
        </div>
        <Divider />
        <div className={styles.fieldWrapper}>
          {fieldConfig.map((field, index) => (
            <Field
              key={index}
              containerClasses={field.containerClass}
              labelClasses={field.labelClass}
              label={field.title}
              inputComponent={field.element as ReactElement}
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
            useResizeContainer
            getRowHeight={() => '40px'}
            slots={{
              pagination: () => null,
            }}
            rows={rows ?? []}
            getRowId={({ _id }: { _id: string }) => _id}
            columns={columns}
          />
        </div>
      </div>
    </Modal>
  )
})
