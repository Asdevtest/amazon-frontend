import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './variation-tariff-roi-cell.style'

interface VariationTariffRoiCellProps {
  roi?: number
}

export const VariationTariffRoiCell: FC<VariationTariffRoiCellProps> = memo(({ roi }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      {roi ? (
        <div
          className={cx(styles.destination, {
            [styles.badRoi]: roi < 100,
            [styles.normalRoi]: roi >= 100 && roi < 130,
            [styles.goodRoi]: roi >= 130,
          })}
        >
          <p>{roi ? toFixed(roi, 2) : t(TranslationKey.Missing)}</p>
        </div>
      ) : (
        t(TranslationKey.Missing)
      )}
    </div>
  )
})
