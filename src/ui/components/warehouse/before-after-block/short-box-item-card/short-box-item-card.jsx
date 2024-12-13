import { Typography } from '@mui/material'

import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Text } from '@components/shared/text'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './box-item-card.style'

export const ShortBoxItemCard = ({ item, superCount, boxId, taskType, readOnly }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.mainWrapper}>
        <img className={styles.img} src={item.product?.images[0] && getAmazonImageUrl(item.product.images[0], true)} />

        <div className={styles.attributeWrapper}>
          <div className={styles.attributeHeaderWrapper}>
            <div className={styles.countWrapper}>
              <div className={styles.countSubWrapper}>
                <p title={t(TranslationKey['Number of products in the box'])} className={styles.subTitle}>
                  {t(TranslationKey.Quantity) + ':'}
                </p>
                <Typography className={styles.count}>{item.amount}</Typography>
              </div>

              {superCount > 1 && (
                <div className={styles.countSubWrapper}>
                  <Typography className={styles.subTitle}>{t(TranslationKey['Super Box']) + ':'}</Typography>
                  <Typography className={styles.count}>{`x${superCount}`}</Typography>
                </div>
              )}
            </div>
            {((readOnly && taskType === TaskOperationType.RECEIVE) || taskType !== TaskOperationType.RECEIVE) && (
              <div className={styles.countSubWrapper}>
                <Typography className={styles.subTitle}>{t(TranslationKey['Box number:'])}</Typography>
                <Typography className={styles.count}>{boxId}</Typography>
              </div>
            )}
          </div>

          <div className={styles.attributeFooterWrapper}>
            <div className={styles.asinWrapper}>
              <Typography className={styles.asin}>{t(TranslationKey.ASIN)}</Typography>
              <Text className={styles.asinTitle} text={item.product?.asin} />
            </div>

            <Typography className={styles.title}>{item.product?.amazonTitle}</Typography>
          </div>
        </div>
      </div>
      <div className={styles.attributeFooterMobileWrapper}>
        <div className={styles.asinWrapper}>
          <Typography className={styles.asin}>{t(TranslationKey.ASIN)}</Typography>
          <Text className={styles.asinTitle} copyable={false} text={item.product?.asin} />
        </div>
        <Typography className={styles.title}>{item.product?.amazonTitle}</Typography>
      </div>
    </div>
  )
}
