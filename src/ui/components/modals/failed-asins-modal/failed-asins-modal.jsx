import { Typography } from '@mui/material'

import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

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
          <Typography>{humanFriendlyStategyStatus(mapProductStrategyStatusEnum[el.strategy]).toUpperCase()}</Typography>
        </div>
      ))}
      <Button styleType={ButtonType.SUCCESS} className={styles.button} onClick={onClickSuccessBtn}>
        {t(TranslationKey.Ok)}
      </Button>
    </div>
  )
}
