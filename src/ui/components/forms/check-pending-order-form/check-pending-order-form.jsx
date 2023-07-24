import { useState } from 'react'

import { Link, Typography } from '@mui/material'

// import {useState} from 'react'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './check-pending-order-form.style'

export const CheckPendingOrderForm = ({
  existingOrders,
  checkPendingData,
  onClickPandingOrder,
  onClickContinueBtn,
  onClickCancelBtn,
}) => {
  const { classes: classNames } = useClassNames()

  const existingOrdersRander = Array.from(new Set(existingOrders.map(el => el.asin)))

  const [submitIsClicked, setSubmitIsClicked] = useState(false)

  const onSubmit = () => {
    onClickContinueBtn()
    setSubmitIsClicked(true)
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.productsWrapper}>
        <div className={classNames.warningWrapper}>
          <Typography className={classNames.warning}>{t(TranslationKey.Attention)}</Typography>
        </div>
        <div className={classNames.asinsAndOrderWrapper}>
          <div className={classNames.asinsWrapper}>
            {
              <Typography className={[classNames.text, classNames.description]}>
                {t(TranslationKey['With the products']) + ':'}
              </Typography>
            }

            {existingOrdersRander?.map((item, itemIndex) => (
              <Typography key={itemIndex} className={classNames.text}>
                {`${t(TranslationKey.ASIN)} ${item}${
                  existingOrdersRander.length > 1 && itemIndex + 1 !== existingOrdersRander.length ? ',' : ''
                }`}
              </Typography>
            ))}
          </div>

          <div className={classNames.asinsWrapper}>
            {
              <Typography className={[classNames.text, classNames.description]}>
                {t(TranslationKey['there are already pending orders']) + ':'}
              </Typography>
            }

            {checkPendingData.map(item =>
              item.map((order, orderIndex) => (
                <Link
                  key={orderIndex}
                  className={[classNames.text, classNames.orderInfo]}
                  onClick={() => onClickPandingOrder(order?._id)}
                >
                  {`№${order?.id}${item.length > 1 && orderIndex + 1 !== item.length ? ',' : ''}`}
                </Link>
              )),
            )}
          </div>
        </div>
        <div className={classNames.buttonGroup}>
          <Button success disabled={submitIsClicked} variant="contained" onClick={onSubmit}>
            {t(TranslationKey.Continue)}
          </Button>
          <Button variant="text" className={classNames.CancelBtn} onClick={onClickCancelBtn}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
        <div className={classNames.orders}></div>
      </div>
    </div>
  )
}
