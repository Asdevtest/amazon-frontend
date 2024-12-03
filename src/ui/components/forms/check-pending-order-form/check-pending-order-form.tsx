import Link from 'antd/es/typography/Link'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './check-pending-order-form.style'

interface CheckPendingOrderFormProps {
  products: IProduct[]
  onSubmit: () => void
  onClose: () => void
  onClickPandingOrder: (id: string) => void
  loading?: boolean
}

export const CheckPendingOrderForm: FC<CheckPendingOrderFormProps> = memo(props => {
  const { products, onClickPandingOrder, onSubmit, onClose, loading } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.warning}>{t(TranslationKey.Attention)}</p>

      <div className={styles.asins}>
        <Text copyable={false} text={t(TranslationKey['Orders already exist']) + ':'} />

        {products?.map((product, index) => (
          <div key={index}>
            <span className={styles.asin}>{`${t(TranslationKey.ASIN)} ${product.asin}  ${t(
              TranslationKey.Orders,
            ).toLowerCase()}: `}</span>

            {product.orders.map((order, orderIndex) => (
              <Link key={orderIndex} onClick={() => onClickPandingOrder(order?._id)}>
                {`№${order?.xid}${orderIndex + 1 !== product.orders.length ? ', ' : ''}`}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <CustomButton loading={loading} size="large" type="primary" onClick={onSubmit}>
          {t(TranslationKey.Continue)}
        </CustomButton>
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
