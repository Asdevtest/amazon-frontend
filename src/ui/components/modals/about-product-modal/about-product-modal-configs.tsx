/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement } from 'react'

import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './about-product-modal.style'

import { IProductWithOrder } from '../prodct-and-batch-modal/product-and-batch.modal'

import { AboutProductSwitcher } from './about-product-switcher'

interface IModalFieldConfig {
  selectedProduct: IProductWithOrder
}

interface IModalConfig {
  title: string
  element: ReactElement | ReactElement[]
  containerClass: string
  labelClass: string
}

export const switcherSettings = [
  { label: () => t(TranslationKey['Orders info']), value: AboutProductSwitcher.ORDER_INFORMATION },
  { label: () => t(TranslationKey['Batch data']), value: AboutProductSwitcher.BATCH_DATA },
]

export const infoModalConfig = ({ selectedProduct }: IModalFieldConfig): IModalConfig[] => {
  const { classes: styles, cx } = useStyles()
  return [
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
        // @ts-ignore
        <div className={styles.additionPurchaseWrap}>
          <p className={styles.toPurchase}>{`${t(TranslationKey['To repurchase'])}: ${
            selectedProduct?.purchaseQuantity
          }`}</p>
          <Input className={styles.inputAdditionPurchase} value={selectedProduct?.fourMonthesStock} />
        </div>
      ),
      containerClass: styles.field,
      labelClass: styles.infoHeader,
    },
  ]
}
