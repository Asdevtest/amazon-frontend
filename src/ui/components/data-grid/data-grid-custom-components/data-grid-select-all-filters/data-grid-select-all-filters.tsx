import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { useStyles } from '@components/data-grid/data-grid-custom-components/data-grid-select-all-filters/data-grid-select-all-filters.style'
import { Checkbox } from '@components/shared/checkbox'

import { t } from '@utils/translations'

interface DataGridSelectAllFiltersProps {
  choosenItems: string[]
  setChoosenItems: (arg: string[]) => void
  itemsForRender: string[]
}

export const DataGridSelectAllFilters: FC<DataGridSelectAllFiltersProps> = props => {
  const { choosenItems, setChoosenItems, itemsForRender } = props
  const { classes: styles } = useStyles()

  const selectAllItemsHandler = (fullList: string[]) => {
    if (fullList.length === choosenItems.length) {
      setChoosenItems([])
    } else {
      setChoosenItems(fullList)
    }
  }

  return (
    <div className={styles.body}>
      <Checkbox
        color="primary"
        checked={itemsForRender.length === choosenItems.length}
        onClick={() => selectAllItemsHandler(itemsForRender)}
      />
      <div title={t(TranslationKey.All)} className={styles.title}>
        {t(TranslationKey.All)}
      </div>
    </div>
  )
}
