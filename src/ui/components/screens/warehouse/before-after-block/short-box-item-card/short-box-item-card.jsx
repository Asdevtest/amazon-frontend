import React from 'react'

import {Typography} from '@material-ui/core'

import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {CopyValue} from '@components/copy-value/copy-value'
import {Text} from '@components/text'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './box-item-card.style'

export const ShortBoxItemCard = ({item, superCount, boxId, taskType, readOnly}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={item.product?.images[0] && getAmazonImageUrl(item.product.images[0])} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.attributeHeaderWrapper}>
            <div className={classNames.countWrapper}>
              <div className={classNames.countSubWrapper}>
                <Text
                  tooltipInfoContent={t(TranslationKey['Number of products in the box'])}
                  className={classNames.subTitle}
                >
                  {t(TranslationKey.Quantity) + ':'}
                </Text>
                <Typography className={classNames.count}>{item.amount}</Typography>
              </div>

              {superCount > 1 && (
                <Typography className={classNames.superCount}>{`${t(
                  TranslationKey['Super Box'],
                )} x ${superCount}`}</Typography>
              )}
            </div>
            {((readOnly && taskType === TaskOperationType.RECEIVE) || taskType !== TaskOperationType.RECEIVE) && (
              <div className={classNames.countSubWrapper}>
                <Typography className={classNames.subTitle}>{t(TranslationKey['Box number:'])}</Typography>
                <Typography className={classNames.count}>{boxId}</Typography>
              </div>
            )}
          </div>

          <div className={classNames.attributeFooterWrapper}>
            <div className={classNames.copyValueWrapper}>
              <div className={classNames.asinWrapper}>
                <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
                <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
              </div>
              {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
            </div>

            <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
          </div>
        </div>
      </div>
      <div className={classNames.attributeFooterMobileWrapper}>
        <div className={classNames.asinWrapper}>
          <Typography className={classNames.asin}>{t(TranslationKey.ASIN)}</Typography>
          <Typography className={classNames.asinTitle}>{item.product?.asin}</Typography>
        </div>
        <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
      </div>
    </div>
  )
}
