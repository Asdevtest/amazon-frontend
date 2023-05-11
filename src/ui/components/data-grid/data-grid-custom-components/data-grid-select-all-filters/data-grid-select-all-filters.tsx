import {Checkbox} from '@mui/material'

import React, {FC} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {useClassNames} from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters.style'

import {t} from '@utils/translations'

interface DataGridSelectAllFiltersProps {
  choosenItems: string[]
  setChoosenItems: (arg: string[]) => void
  itemsForRender: string[]
}

export const DataGridSelectAllFilters: FC<DataGridSelectAllFiltersProps> = props => {
  const {choosenItems, setChoosenItems, itemsForRender} = props
  const {classes: classNames} = useClassNames()

  const selectAllItemsHandler = (fullList: string[]) => {
    if (fullList.length === choosenItems.length) {
      setChoosenItems([])
    } else {
      setChoosenItems(fullList)
    }
  }

  return (
    <div className={classNames.body}>
      <Checkbox
        color="primary"
        checked={itemsForRender.length === choosenItems.length}
        onClick={() => selectAllItemsHandler(itemsForRender)}
      />
      <div className={classNames.title}>{t(TranslationKey.All)}</div>
    </div>
  )
}
