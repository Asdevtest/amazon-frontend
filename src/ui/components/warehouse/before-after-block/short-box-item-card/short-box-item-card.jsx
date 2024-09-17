import { TaskOperationType } from '@constants/task/task-operation-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value/copy-value'

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
                <p className={styles.count}>{item.amount}</p>
              </div>

              {superCount > 1 && (
                <div className={styles.countSubWrapper}>
                  <p className={styles.subTitle}>{t(TranslationKey['Super Box']) + ':'}</p>
                  <p className={styles.count}>{`x${superCount}`}</p>
                </div>
              )}
            </div>
            {((readOnly && taskType === TaskOperationType.RECEIVE) || taskType !== TaskOperationType.RECEIVE) && (
              <div className={styles.countSubWrapper}>
                <p className={styles.subTitle}>{t(TranslationKey['Box number:'])}</p>
                <p className={styles.count}>{boxId}</p>
              </div>
            )}
          </div>

          <div className={styles.attributeFooterWrapper}>
            <div className={styles.copyValueWrapper}>
              <div className={styles.asinWrapper}>
                <p className={styles.asin}>{t(TranslationKey.ASIN)}</p>
                <p className={styles.asinTitle}>{item.product?.asin}</p>
              </div>
              {item.product?.asin ? <CopyValue text={item.product?.asin} /> : null}
            </div>

            <p className={styles.title}>{item.product?.amazonTitle}</p>
          </div>
        </div>
      </div>
      <div className={styles.attributeFooterMobileWrapper}>
        <div className={styles.asinWrapper}>
          <p className={styles.asin}>{t(TranslationKey.ASIN)}</p>
          <p className={styles.asinTitle}>{item.product?.asin}</p>
        </div>
        <p className={styles.title}>{item.product?.amazonTitle}</p>
      </div>
    </div>
  )
}
