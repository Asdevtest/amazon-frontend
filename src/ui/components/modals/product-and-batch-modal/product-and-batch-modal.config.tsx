import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './product-and-batch-modal.style'

import { IModalConfig, IProductWithOrder, ProductAndBatchModalSwitcherConditions } from './product-and-batch-modal.type'

export const switcherSettings = [
  { label: () => t(TranslationKey['Orders info']), value: ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION },
  { label: () => t(TranslationKey['Batch data']), value: ProductAndBatchModalSwitcherConditions.BATCH_DATA },
]

export const infoModalConfig = (selectedProduct: IProductWithOrder): IModalConfig[] => {
  const { classes: styles, cx } = useStyles()

  return [
    {
      title: t(TranslationKey.Available),
      element: <p className={styles.fieldValue}>{selectedProduct?.fbaFbmStockSum || 0}</p>,
    },
    {
      title: t(TranslationKey.Reserved),
      element: <p className={styles.fieldValue}>{selectedProduct?.reservedSum || 0}</p>,
    },
    {
      title: t(TranslationKey.Inbound),
      element: <p className={styles.fieldValue}>{selectedProduct?.sentToFbaSum || 0}</p>,
    },
    {
      title: t(TranslationKey.Order),
      element: (
        <div className={styles.fieldColumn}>
          <p className={cx(styles.fieldValue, styles.blueText)}>{selectedProduct?.amountInOrders}</p>
          <div className={styles.flexConainer}>
            <WatchLaterSharpIcon className={styles.fieldIcon} />
            <p className={styles.fieldValue}>{selectedProduct?.amountInPendingOrders}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'In Transfer',
      element: <p className={styles.fieldValue}>{selectedProduct?.inTransfer || 0}</p>,
    },
    {
      title: t(TranslationKey['In stock']),
      element: (
        <div className={styles.fieldColumn}>
          {selectedProduct?.boxAmounts?.map(box => (
            <div key={box._id} className={styles.flexConainer}>
              <p className={cx(styles.fieldValue, styles.blueText)}>{box.storekeeper.name}</p>
              <p className={styles.fieldValue}> {box.amountInBoxes}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: t(TranslationKey['Stock sum']),
      element: <p className={styles.fieldValue}> {selectedProduct?.sumStock || 0}</p>,
    },
    {
      title: t(TranslationKey['Stock cost']),
      element: (
        <p className={cx(styles.stockCostWrapper, styles.fieldValue)}>
          {selectedProduct?.stockCost ? toFixed(selectedProduct?.stockCost) : 0}
        </p>
      ),
    },
    {
      title: t(TranslationKey['Recommendation for additional purchases']),
      element: (
        <div className={styles.additionPurchaseWrapper}>
          <div className={styles.flexConainer}>
            <p className={styles.fieldValue}>{`${t(TranslationKey['To repurchase'])}: `}</p>
            <p className={styles.fieldValue}>{selectedProduct?.purchaseQuantity || 0}</p>
          </div>

          <input disabled className={styles.inputAdditionPurchase} value={selectedProduct?.fourMonthesStock} />
        </div>
      ),
    },
  ]
}
