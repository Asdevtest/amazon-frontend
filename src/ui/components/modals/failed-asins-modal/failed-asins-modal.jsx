import { humanFriendlyStategyStatus, productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './failed-asins-modal.style'

export const FailedAsinsModal = ({ failedData, onClickSuccessBtn }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.modalMessageWrapper}>
      <p className={styles.title}>
        {t(TranslationKey['The following ASINs have already been entered into the table'])}
      </p>
      {failedData.failed.map(el => (
        <div key={el.asin} className={styles.asinsWrapper}>
          <p>{el.asin}</p>
          <p>{humanFriendlyStategyStatus(productStrategyStatusesEnum[el.strategy]).toUpperCase()}</p>
        </div>
      ))}
      <CustomButton type="primary" onClick={onClickSuccessBtn}>
        {t(TranslationKey.Ok)}
      </CustomButton>
    </div>
  )
}
