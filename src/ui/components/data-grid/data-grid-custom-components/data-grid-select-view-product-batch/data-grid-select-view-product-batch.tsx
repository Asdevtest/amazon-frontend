import { useClassNames } from './data-grid-select-view-product-batch.style'
import { cx } from '@emotion/css'
import { FC } from 'react'
import { tableProductViewMode } from '@constants/keys/table-product-view'
import { AbbreviatedViewIcon, ExtendedViewIcon } from '@components/shared/svg-icons'

interface DataGridSelectViewProductBatchProps {
  selectedViewMode: string
  changeViewModeHandler: (value: string) => void
}

export const DataGridSelectViewProductBatch: FC<DataGridSelectViewProductBatchProps> = props => {
  const { classes: classNames } = useClassNames()

  const { selectedViewMode, changeViewModeHandler } = props

  const onClickViewIcon = (value: string) => {
    if (selectedViewMode !== value) {
      changeViewModeHandler(value)
    }
  }

  return (
    <div className={classNames.root}>
      <ExtendedViewIcon
        className={cx(classNames.icon, {
          [classNames.activeViewMode]: selectedViewMode === tableProductViewMode.EXTENDED,
        })}
        onClick={() => onClickViewIcon(tableProductViewMode.EXTENDED)}
      />

      <AbbreviatedViewIcon
        className={cx(classNames.icon, {
          [classNames.activeViewMode]: selectedViewMode === tableProductViewMode.ABBREVIATED,
        })}
        onClick={() => onClickViewIcon(tableProductViewMode.ABBREVIATED)}
      />
    </div>
  )
}
