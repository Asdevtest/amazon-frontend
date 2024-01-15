import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

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
      element: <p>{selectedProduct?.fbaFbmStockSum || '-'}</p>,
    },
    {
      title: t(TranslationKey.Reserved),
      element: <p className={styles.fieldText}>{selectedProduct?.reservedSum || '-'}</p>,
    },
    {
      title: t(TranslationKey.Inbound),
      element: <p className={styles.fieldText}>{selectedProduct?.sentToFbaSum || '-'}</p>,
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
    },
    {
      title: 'In Transfer',
      element: <p className={styles.fieldText}>{selectedProduct?.inTransfer || '-'}</p>,
    },
    {
      title: t(TranslationKey['In stock']),
      element: (
        <>
          {selectedProduct?.boxAmounts?.map(box => (
            <p key={box._id} className={styles.inStock}>
              <span className={styles.storekeeperName}>{box.storekeeper.name}</span>
              <span className={styles.fieldText}> {box.amountInBoxes}</span>
            </p>
          ))}
        </>
      ),
    },
    {
      title: t(TranslationKey['Stock sum']),
      element: <p className={styles.fieldText}> {selectedProduct?.sumStock}</p>,
    },
    {
      title: t(TranslationKey['Stock cost']),
      element: <p className={styles.fieldText}>{toFixed(selectedProduct?.stockCost, 0)}</p>,
    },
    {
      title: t(TranslationKey['Recommendation for additional purchases']),
      element: (
        <div className={styles.additionPurchaseWrap}>
          <p className={styles.toPurchase}>{`${t(TranslationKey['To repurchase'])}: ${
            selectedProduct?.purchaseQuantity
          }`}</p>
          <Input className={styles.inputAdditionPurchase} value={selectedProduct?.fourMonthesStock} />
        </div>
      ),
    },
  ]
}
