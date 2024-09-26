import { MdOutlineWatchLater } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-and-batch-modal.style'

import { IModalConfig, ProductAndBatchModalSwitcherConditions } from './product-and-batch-modal.type'

export const switcherSettings = [
  { label: t(TranslationKey['Orders info']), value: ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION },
  { label: t(TranslationKey['Batch data']), value: ProductAndBatchModalSwitcherConditions.BATCH_DATA },
]

export const infoModalConfig = (
  selectedProduct: IProduct,
  onOpenProductDataModal: (onAmazon: boolean) => void,
): IModalConfig[] => {
  const { classes: styles, cx } = useStyles()

  return [
    {
      title: t(TranslationKey.Available),
      element: () => <p className={styles.fieldValue}>{selectedProduct?.fbaFbmStockSum || 0}</p>,
    },
    {
      title: t(TranslationKey.Reserved),
      element: () => <p className={styles.fieldValue}>{selectedProduct?.reservedSum || 0}</p>,
    },
    {
      title: t(TranslationKey.Inbound),
      element: () => {
        const isActiveButton = selectedProduct?.sentToFbaSum !== 0

        return (
          <button
            className={cx(styles.fieldValue, {
              [styles.blueText]: isActiveButton,
            })}
            onClick={() => (isActiveButton ? onOpenProductDataModal(true) : undefined)}
          >
            {selectedProduct?.sentToFbaSum || 0}
          </button>
        )
      },
    },
    {
      title: t(TranslationKey.Order),
      element: () => (
        <div className={styles.fieldColumn}>
          <p className={styles.fieldValue}>{selectedProduct?.amountInOrders}</p>

          <div className={styles.flexConainer}>
            <MdOutlineWatchLater size={20} className={styles.fieldIcon} />
            <p className={styles.fieldValue}>{selectedProduct?.amountInPendingOrders}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'In Transfer',
      element: () => {
        const isActiveButton = selectedProduct?.inTransfer !== 0

        return (
          <button
            className={cx(styles.fieldValue, {
              [styles.blueText]: isActiveButton,
            })}
            onClick={() => (isActiveButton ? onOpenProductDataModal(false) : undefined)}
          >
            {selectedProduct?.inTransfer || 0}
          </button>
        )
      },
    },
    {
      title: t(TranslationKey['In stock']),
      element: () => {
        const showBoxAmounts = selectedProduct?.boxAmounts?.length > 0

        return showBoxAmounts ? (
          <div className={styles.fieldColumn}>
            {selectedProduct?.boxAmounts?.map(box => (
              <div key={box._id} className={styles.flexConainer}>
                <p className={styles.fieldValue}>{box.storekeeper.name}</p>
                <p className={styles.fieldValue}> {box.amountInBoxes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.fieldValue}>{t(TranslationKey['No data'])}</p>
        )
      },
    },
    {
      title: t(TranslationKey['Stock sum']),
      element: () => <p className={styles.fieldValue}> {selectedProduct?.sumStock || 0}</p>,
    },
    {
      title: t(TranslationKey['Stock cost']),
      element: () => (
        <p className={cx(styles.stockCostWrapper, styles.fieldValue)}>
          {selectedProduct?.stockCost ? toFixed(selectedProduct?.stockCost) : 0}
        </p>
      ),
    },
    {
      title: t(TranslationKey['Recommendation for additional purchases']),
      element: () => {
        const purchaseQuantityText = `${t(TranslationKey['To repurchase'])}: ${selectedProduct?.purchaseQuantity || 0}`

        return (
          <div className={styles.additionPurchaseWrapper}>
            <p className={styles.fieldValue}>{purchaseQuantityText}</p>

            <input disabled className={styles.inputAdditionPurchase} value={selectedProduct?.fourMonthesStock} />
          </div>
        )
      },
    },
  ]
}
