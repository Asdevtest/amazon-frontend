/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { useStyles } from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters.style'
import { CustomCheckbox } from '@components/shared/custom-checkbox'

interface DataGridSelectAllFiltersProps<T> {
  choosenItems: T[]
  setChoosenItems: (arg: T[]) => void
  itemsForRender: T[]
}

export const DataGridSelectAllFilters: FC<DataGridSelectAllFiltersProps<any>> = memo(props => {
  const { choosenItems, setChoosenItems, itemsForRender } = props

  const { classes: styles } = useStyles()

  const selectAllItemsHandler = (fullList: (typeof choosenItems)[]) => {
    if (fullList.length === choosenItems.length) {
      setChoosenItems([])
    } else {
      setChoosenItems(fullList)
    }
  }

  return (
    <CustomCheckbox
      checked={itemsForRender?.length === choosenItems.length}
      wrapperClassName={styles.wrapper}
      labelClassName={styles.title}
      onChange={() => selectAllItemsHandler(itemsForRender)}
    >
      All
    </CustomCheckbox>
  )
})
