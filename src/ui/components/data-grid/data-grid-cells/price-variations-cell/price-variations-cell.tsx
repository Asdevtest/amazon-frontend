import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './price-variations-cell.style'

interface IPriceVariation {
  price: number
  quantity: number
}

interface PriceVariationsCellProps {
  variations: IPriceVariation[]
  yuanToDollarRate?: number
}

export const PriceVariationsCell: FC<PriceVariationsCellProps> = memo(({ variations, yuanToDollarRate }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.variations}>
        {variations?.length > 0
          ? variations.map((variation, index) => {
              const variationValue = `${variation.quantity} ${t(TranslationKey['pcs.'])} / ${toFixedWithDollarSign(
                variation.price / (yuanToDollarRate || 0),
                2,
              )} ${t(TranslationKey.Per).toLowerCase()} ${t(TranslationKey['pcs.'])}`

              return (
                <p key={index} className={styles.text}>
                  {variationValue}
                </p>
              )
            })
          : t(TranslationKey['No data'])}
      </div>
    </div>
  )
})
