import { useState } from 'react'

import { Link } from '@mui/material'

// import {useState} from 'react'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './check-pending-order-form.style'

export const CheckPendingOrderForm = ({
  existingProducts,
  onClickPandingOrder,
  onClickContinueBtn,
  onClickCancelBtn,
}) => {
  const { classes: styles, cx } = useStyles()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const onSubmit = () => {
    onClickContinueBtn()
    setSubmitIsClicked(true)
  }

  return (
    <div className={styles.root}>
      <p className={styles.warning}>{t(TranslationKey.Attention)}</p>

      <div className={styles.asinsWrapper}>
        <p className={cx(styles.text, styles.description)}>{t(TranslationKey['Orders already exist']) + ':'}</p>

        {existingProducts?.map((product, productIndex) => (
          <p key={productIndex} className={styles.text}>
            {`${t(TranslationKey.ASIN)} ${product.asin}  ${t(TranslationKey.Orders).toLowerCase()}: `}
            {product.orders.map((order, orderIndex) => (
              <Link
                key={orderIndex}
                className={cx(styles.text, styles.orderInfo)}
                onClick={() => onClickPandingOrder(order?._id)}
              >
                {`№${order?.xid}${orderIndex + 1 !== product.orders.length ? ', ' : ''}`}
              </Link>
            ))}
          </p>
        ))}
      </div>
      <div className={styles.buttonGroup}>
        <Button styleType={ButtonStyle.SUCCESS} disabled={submitIsClicked} onClick={onSubmit}>
          {t(TranslationKey.Continue)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onClickCancelBtn}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
