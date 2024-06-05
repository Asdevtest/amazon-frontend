/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { RadioButtons } from '@components/shared/radio-buttons'
import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'

import { FiltersObject } from '@utils/data-grid-filters'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './multiple-column-menu.style'

import { useNumberColumnMenu } from './hooks/use-multiple-column-menu'

export interface MultipleColumnMenuProps {
  fields: IRadioBottonsSetting[]
  filtersData: FiltersObject<any>[]
  columnMenuConfig: any
  filterRequestStatus: loadingStatus
  onClose: () => void
  onClickFilterBtn: (field: string, table: string) => void
  onChangeFullFieldMenuItem: (chosenItems: any[], field: string) => void
  onClickAccept: () => void
}

export const MultipleColumnMenu: FC<MultipleColumnMenuProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    fields,
    filtersData,
    columnMenuConfig,
    filterRequestStatus,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  const {
    currentColumnMenu,
    handleChangeCurrentColumnMenu,
    currentFilterData,
    CurrentColumnMenuComponent,
    currentColumnMenuSettings,
  } = useNumberColumnMenu({ fields, filtersData, columnMenuConfig })

  return (
    <div>
      <div className={styles.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={props.fields}
          currentValue={currentColumnMenu}
          onClickRadioButton={selectedStatus => handleChangeCurrentColumnMenu(selectedStatus as string)}
        />
      </div>

      <CurrentColumnMenuComponent
        {...currentColumnMenuSettings}
        filtersData={currentFilterData}
        filterRequestStatus={filterRequestStatus}
        onClose={onClose}
        onClickFilterBtn={onClickFilterBtn}
        onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
        onClickAccept={onClickAccept}
      />
    </div>
  )
})
