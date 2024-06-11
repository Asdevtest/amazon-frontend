/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CircleSpinner } from '@components/shared/circle-spinner'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './data-wrapper-column-menu.style'

import { DataGridSelectAllFilters } from '../../data-grid-select-all-filters/data-grid-select-all-filters'

interface DataWrapperColumnMenuProps extends PropsWithChildren {
  dataforRender: any
  filterRequestStatus: loadingStatus
  chosenItems: any
  setChosenItems: (arg: any) => void
}

export const DataWrapperColumnMenu: FC<DataWrapperColumnMenuProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { children, dataforRender, filterRequestStatus, chosenItems, setChosenItems } = props

  return (
    <div className={styles.filterItemsWrapper}>
      {filterRequestStatus === loadingStatus.IS_LOADING ? (
        <div className={styles.loaderWrapper}>
          <CircleSpinner size={50} />
        </div>
      ) : (
        <>
          {children ? (
            <>
              <DataGridSelectAllFilters
                choosenItems={chosenItems}
                itemsForRender={dataforRender}
                setChoosenItems={setChosenItems}
              />
              {children}
            </>
          ) : (
            <p className={styles.noOptionText}>{t(TranslationKey['No options'])}</p>
          )}
        </>
      )}
    </div>
  )
})
