import {Link, Typography} from '@mui/material'

// import {useState} from 'react'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './check-pending-order-form.style'

export const CheckPendingOrderForm = ({
  existingOrders,
  checkPendingData,
  onClickPandingOrder,
  onClickContinueBtn,
  onClickCancelBtn,
}) => {
  const {classes: classNames} = useClassNames()

  const existingOrdersRander = Array.from(new Set(existingOrders.map(el => el.asin)))

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

            {checkPendingData.map((item, itemIndex) =>
              item.map((order, orderIndex) => (
                <Link
                  key={itemIndex}
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
          <Button success variant="contained" onClick={onClickContinueBtn}>
            {t(TranslationKey.Continue)}
          </Button>
          <Button variant="text" onClick={onClickCancelBtn}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
        <div className={classNames.orders}></div>
      </div>
    </div>
  )
}
