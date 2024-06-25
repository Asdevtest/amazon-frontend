import { Typography } from '@mui/material'

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
      <Typography paragraph className={styles.title}>
        {t(TranslationKey['The following ASINs have already been entered into the table'])}
      </Typography>
      {failedData.failed.map(el => (
        <div key={el.asin} className={styles.asinsWrapper}>
          <Typography>{el.asin}</Typography>
          <Typography>{humanFriendlyStategyStatus(productStrategyStatusesEnum[el.strategy]).toUpperCase()}</Typography>
        </div>
      ))}
      <Button styleType={ButtonStyle.SUCCESS} className={styles.button} onClick={onClickSuccessBtn}>
        {t(TranslationKey.Ok)}
      </Button>
    </div>
  )
}
