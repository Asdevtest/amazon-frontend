import { humanFriendlyStategyStatus, productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
      <Button styleType={ButtonStyle.SUCCESS} onClick={onClickSuccessBtn}>
        {t(TranslationKey.Ok)}
      </Button>
    </div>
  )
}
