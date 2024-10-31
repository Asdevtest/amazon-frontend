import { FC, memo } from 'react'
import { MdOutlineCalculate } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './fees-values-with-calculate-btn-cell.style'

interface FeesValuesWithCalculateBtnCellProps {
  noCalculate: boolean
  productId: string
  fbafee: number
  reffee: number
  onClickCalculate?: (productId: string) => void
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
        <CustomButton icon={<MdOutlineCalculate />} onClick={() => onClickCalculate?.(productId)}>
          {'Calculate fees'}
        </CustomButton>
      )}
    </div>
  )
})
