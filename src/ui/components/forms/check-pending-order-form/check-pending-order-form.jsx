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

  console.log('existingOrders', existingOrders)
  console.log('checkPendingData', checkPendingData)

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

            {existingOrders?.map((item, itemIndex) => (
              <Typography key={itemIndex} className={classNames.text}>
                {`${t(TranslationKey.ASIN)} ${item?.asin}${
                  checkPendingData.length > 1 && itemIndex + 1 !== checkPendingData.length ? ',' : ''
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
              item.map(order => (
                <Link
                  key={itemIndex}
                  className={[classNames.text, classNames.orderInfo]}
                  onClick={() => onClickPandingOrder(order?._id)}
                >
                  {`№${order?.id}${
                    checkPendingData.length > 1 && itemIndex + 1 !== checkPendingData.length ? ',' : ''
                  }`}
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
