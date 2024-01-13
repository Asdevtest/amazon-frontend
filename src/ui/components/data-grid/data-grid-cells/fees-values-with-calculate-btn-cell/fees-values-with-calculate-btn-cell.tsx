import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './fees-values-with-calculate-btn-cell.style'

interface FeesValuesWithCalculateBtnCellProps {
  noCalculate: boolean
  onClickCalculate: (productId: string) => void
  productId: string
  fbafee: number
  reffee: number
}

export const FeesValuesWithCalculateBtnCell: FC<FeesValuesWithCalculateBtnCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { noCalculate, onClickCalculate, productId, fbafee, reffee } = props

  return (
    <div className={styles.feesTableWrapper}>
      <p className={styles.typoCell}>
        {t(TranslationKey.Fees) + ': '}
        <span className={styles.typoSpan}>{toFixedWithDollarSign(fbafee, 2)}</span>
      </p>
      <p className={styles.typoCell}>
        {t(TranslationKey.Net) + ': '}
        <span className={styles.typoSpan}>{toFixedWithDollarSign(reffee, 2)}</span>
      </p>
      {!noCalculate && (
        <Button
          disableElevation
          className={styles.cellBtn}
          startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
          onClick={() => onClickCalculate(productId)}
        >
          {'Calculate fees'}
        </Button>
      )}
    </div>
  )
})
