import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

import { useStyles } from './variation-tariff-roi-cell.style'

interface VariationTariffRoiCellProps {
  destinations: IDestinationVariationWithCalculations[]
}

export const VariationTariffRoiCell: FC<VariationTariffRoiCellProps> = memo(({ destinations }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      {destinations?.length
        ? destinations.map((destination, index) => {
            const roi = Number(destination?.destination?.roi)

            return (
              <div
                key={index}
                className={cx(styles.destination, {
                  [styles.badRoi]: roi < 100,
                  [styles.normalRoi]: roi >= 100 && roi < 130,
                  [styles.goodRoi]: roi >= 130,
                })}
              >
                <p>{toFixed(destination?.destination?.roi, 2)}</p>
              </div>
            )
          })
        : t(TranslationKey.Missing)}
    </div>
  )
})
