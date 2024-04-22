import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDestinationVariationWithCalculations } from '@typings/shared/destinations'

import { useStyles } from './approximate-cell.style'

import { MultilineTextCell } from '../multiline-text-cell/multiline-text-cell'

import { getCellValue } from './helpers/get-cell-value'

interface ApproximateCellProps {
  destinations: IDestinationVariationWithCalculations[]
  field: string
  borderLeft?: boolean
  borderRight?: boolean
}

export const ApproximateCell: FC<ApproximateCellProps> = memo(({ destinations, field, borderLeft, borderRight }) => {
  const { classes: styles, cx } = useStyles()

  const renderCell = (text: string, index?: number) => (
    <div
      key={index}
      className={cx(styles.destination, {
        [styles.borderLeft]: borderLeft,
        [styles.borderRight]: borderRight,
      })}
    >
      <MultilineTextCell text={text} maxLength={25} />
    </div>
  )

  return (
    <div className={styles.wrapper}>
      {destinations?.length
        ? destinations.map((destination, index) => renderCell(getCellValue(field, destination), index))
        : renderCell(t(TranslationKey.Missing))}
    </div>
  )
})
