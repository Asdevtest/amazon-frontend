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

  const roiValue = toFixed(roi)

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
          <p title={roiValue}>{roiValue}</p>
        </div>
      ) : (
        t(TranslationKey.Missing)
      )}
    </div>
  )
})
