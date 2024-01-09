import { FC, ReactElement, memo } from 'react'

import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'
import { Divider } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IOrderBox, IOrderBoxBatch } from '@typings/order-box'
import { IProduct } from '@typings/product'
import { IShop } from '@typings/shop'

import { useStyles } from './about-product-modal.style'

import { aboutProductsColumns } from './about-product-columns/about-products-columns'
import { AboutProductSwitcher } from './about-product-switcher'
import { batchDataColumns } from './batch-data-columns/batch-data-columns'

interface IAboutProductModal {
  selectedProduct: IProduct & { orders: IOrderBox[]; sumStock: number; purchaseQuantity: number; stockCost: number }
  shops: IShop[]
  batches: IOrderBoxBatch[]
  showLoading: boolean
  setShowBatchModal: () => void
  getCurrentBatch: (guid: string) => void
  currentSwitch: AboutProductSwitcher
  changeSwitcher: (condition?: string | number | null) => void
  openModal: boolean
  setOpenModal: () => void
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

  const { classes: styles, cx } = useStyles()

  const selectedProductShop = shops?.find(shop => shop._id === selectedProduct?.shopId)

  const switcherSettings = [
    { label: () => t(TranslationKey['Orders info']), value: AboutProductSwitcher.ORDER_INFORMATION },
    { label: () => t(TranslationKey['Batch data']), value: AboutProductSwitcher.BATCH_DATA },
  ]

  const infoModalConfig = [
    {
      title: t(TranslationKey.Available),
      element: <p>{selectedProduct?.fbaFbmStockSum || '-'}</p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey.Reserved),
      element: <p className={styles.fieldText}> {selectedProduct?.reservedSum || '-'} </p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey.Inbound),
      element: <p className={styles.fieldText}> {selectedProduct?.sentToFbaSum || '-'}</p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey.Order),
      element: (
        <div>
          <p className={styles.amountOrder}>{selectedProduct?.amountInOrders}</p>
          <p className={cx(styles.waitOrder, styles.fieldText)}>
            <WatchLaterSharpIcon color="primary" />
            <span className={styles.amountInPendingOrders}>{selectedProduct?.amountInPendingOrders}</span>
          </p>
        </div>
      ),
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: 'In Transfer',
      element: <p className={styles.fieldText}> {selectedProduct?.inTransfer || '-'}</p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey['In stock']),
      element: selectedProduct?.boxAmounts?.map(box => (
        <p key={box._id} className={styles.inStock}>
          <span className={styles.storekeeperName}>{box.storekeeper.name}</span>
          <span className={styles.fieldText}> {box.amountInBoxes}</span>
        </p>
      )),
      containerClass: cx(styles.field, styles.inStockField),
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey['Stock sum']),
      element: <p className={styles.fieldText}> {selectedProduct?.sumStock}</p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey['Stock cost']),
      element: <p className={styles.fieldText}>{toFixed(selectedProduct?.stockCost, 0)}</p>,
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
    {
      title: t(TranslationKey['Recommendation for additional purchases']),
      element: (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <div className={styles.additionPurchaseWrap}>
          <p className={styles.toPurchase}>К дозакупке: {selectedProduct?.purchaseQuantity}</p>
          <Input className={styles.inputAdditionPurchase} value={selectedProduct?.fourMonthesStock} />
        </div>
      ),
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
  ]

  const batchRowHandler = (guid: string) => {
    getCurrentBatch(guid)
    setShowBatchModal()
  }
  const columns =
    currentSwitch === AboutProductSwitcher.BATCH_DATA ? batchDataColumns(batchRowHandler) : aboutProductsColumns
  const rows = currentSwitch === AboutProductSwitcher.BATCH_DATA ? batches : selectedProduct?.orders

  const updatedText = `${t(TranslationKey.Updated)}: ${formatDateTime(selectedProduct?.updatedAt)}`

  if (showLoading) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                <span className={styles.showAttributeName}>Shop:</span> {selectedProductShop.name}
              </p>
            )}
            <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={selectedProduct.asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} asin={selectedProduct.skuByClient} />
          </div>
        </div>
        <Divider />
        <div className={styles.fieldWrapper}>
          {infoModalConfig.map(field => (
            <Field
              key={field.title}
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
            getRowId={(row: any) => row._id}
            columns={columns}
          />
        </div>
      </div>
    </Modal>
  )
})
