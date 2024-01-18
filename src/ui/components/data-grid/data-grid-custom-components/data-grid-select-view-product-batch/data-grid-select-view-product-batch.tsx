import { CSSProperties, FC } from 'react'

import { tableProductViewMode } from '@constants/keys/table-product-view'

import { AbbreviatedViewIcon, ExtendedViewIcon } from '@components/shared/svg-icons'

import { useStyles } from './data-grid-select-view-product-batch.style'

interface DataGridSelectViewProductBatchProps {
  selectedViewMode: string
  rootStyles?: CSSProperties
  changeViewModeHandler: (value: string) => void
}

export const DataGridSelectViewProductBatch: FC<DataGridSelectViewProductBatchProps> = props => {
  const { classes: styles, cx } = useStyles()

  const { selectedViewMode, changeViewModeHandler, rootStyles } = props

  const onClickViewIcon = (value: string) => {
    if (selectedViewMode !== value) {
      changeViewModeHandler(value)
    }
  }

  return (
    <div className={styles.root} style={rootStyles}>
      <ExtendedViewIcon
        className={cx(styles.icon, {
          [styles.activeViewMode]: selectedViewMode === tableProductViewMode.EXTENDED,
        })}
        onClick={() => onClickViewIcon(tableProductViewMode.EXTENDED)}
      />

      <AbbreviatedViewIcon
        className={cx(styles.icon, {
          [styles.activeViewMode]: selectedViewMode === tableProductViewMode.ABBREVIATED,
        })}
        onClick={() => onClickViewIcon(tableProductViewMode.ABBREVIATED)}
      />
    </div>
  )
}
