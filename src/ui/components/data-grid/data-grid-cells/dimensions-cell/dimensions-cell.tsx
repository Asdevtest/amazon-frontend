import { Tooltip } from 'antd'
import { FC, memo } from 'react'
import { CiCircleInfo } from 'react-icons/ci'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './dimensions-cell.style'

interface DimensionsCellProps {
  data: IBox // if need other data - replace "IBox" to "any" or use combine types
  calculationField?: Entities
  isTotalWeight?: boolean
  transmittedSizeSetting?: DimensionsEnum
}

export const DimensionsCell: FC<DimensionsCellProps> = memo(props => {
  const { data, calculationField = Entities.WAREHOUSE, isTotalWeight, transmittedSizeSetting } = props

  const { classes: styles, cx } = useStyles()
  const { length, width, height, weight, volumeWeight, finalWeight, totalWeight, unitsSize } = useShowDimensions({
    data,
    sizeSetting: transmittedSizeSetting || DimensionsEnum.EU,
    calculationField,
  })

  const isLessWeight = isTotalWeight && Number(finalWeight) < Number(totalWeight)
  const attentionText = isLessWeight
    ? `${t(TranslationKey['Weight less than'])} ${toFixed(totalWeight, 2)} ${unitsSize}`
    : ''

  return (
    <div className={styles.root}>
      <div className={styles.flexColumn}>
        <div className={styles.option}>
          <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Length)}</p>
          <p className={styles.text}>{length}</p>
        </div>

        <div className={styles.option}>
          <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Width)}</p>
          <p className={styles.text}>{width}</p>
        </div>

        <div className={styles.option}>
          <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Height)}</p>
          <p className={styles.text}>{height}</p>
        </div>
      </div>

      <div className={styles.flexColumn}>
        <div className={styles.option}>
          <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Weight)}</p>
          <p className={styles.text}>{weight}</p>
        </div>

        <div className={styles.option}>
          <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Volume)}</p>
          <p className={styles.text}>{volumeWeight}</p>
        </div>

        <Tooltip title={attentionText}>
          <div className={cx(styles.option, { [styles.lessWeight]: isLessWeight })}>
            <p className={cx(styles.text, styles.bold)}>{t(TranslationKey.Final)}</p>
            <div className={styles.flexRow}>
              {isLessWeight ? <CiCircleInfo size={16} className={styles.icon} /> : null}
              <p className={styles.text}>{finalWeight}</p>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
})
