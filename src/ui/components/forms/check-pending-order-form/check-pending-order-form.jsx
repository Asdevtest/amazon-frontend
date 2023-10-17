import { useState } from 'react'

import { Link, Typography } from '@mui/material'

// import {useState} from 'react'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './check-pending-order-form.style'

export const CheckPendingOrderForm = ({
  existingProducts,
  onClickPandingOrder,
  onClickContinueBtn,
  onClickCancelBtn,
}) => {
  const { classes: classNames } = useClassNames()

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const onSubmit = () => {
    onClickContinueBtn()
    setSubmitIsClicked(true)
  }

  return (
    <div className={classNames.root}>
      <Typography className={classNames.warning}>{t(TranslationKey.Attention)}</Typography>

      <div className={classNames.asinsWrapper}>
        <Typography className={[classNames.text, classNames.description]}>
          {t(TranslationKey['Pending orders already exist']) + ':'}
        </Typography>

        {existingProducts?.map((product, productIndex) => (
          <Typography key={productIndex} className={classNames.text}>
            {`${t(TranslationKey.ASIN)} ${product.asin}  ${t(TranslationKey.Orders).toLowerCase()}: `}
            {product.orders.map((order, orderIndex) => (
              <Link
                key={orderIndex}
                className={[classNames.text, classNames.orderInfo]}
                onClick={() => onClickPandingOrder(order?._id)}
              >
                {`№${order?.id}${orderIndex + 1 !== product.orders.length ? ', ' : ''}`}
              </Link>
            ))}
          </Typography>
        ))}
      </div>
      <div className={classNames.buttonGroup}>
        <Button success disabled={submitIsClicked} variant="contained" onClick={onSubmit}>
          {t(TranslationKey.Continue)}
        </Button>
        <Button variant="text" className={classNames.CancelBtn} onClick={onClickCancelBtn}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
