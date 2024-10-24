import { FC, memo } from 'react'

import { Checkbox } from '@components/shared/checkbox'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'

import { formatDateWithoutTime } from '@utils/date-time'

import { useStyles as useSharedStyles } from '../column-menu.style'
import { useStyles } from './date-column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useDateColumnMenu } from './hooks/use-date-column-menu'

export const DateColumnMenu: FC<ColumnMenuProps<string>> = memo(props => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    additionalFilterSettings,
    fieldNameFilter,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  const {
    chosenItems,
    setChosenItems,

    onChangeRangeDate,

    dataforRender,

    onClickItem,
  } = useDateColumnMenu({
    field,
    table,
    filtersData,
    additionalFilterSettings,
    fieldNameFilter,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <CustomRangeDatePicker size="middle" className={styles.datePicker} onChange={onChangeRangeDate} />

      <DataWrapperColumnMenu
        dataforRender={dataforRender}
        filterRequestStatus={filterRequestStatus}
        chosenItems={chosenItems}
        setChosenItems={setChosenItems}
      >
        {dataforRender?.map((el, index) => {
          const value = formatDateWithoutTime(el)
          const valueChecked = chosenItems?.some(item => item === el)

          return (
            <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
              <p title={value} className={sharedStyles.filterTitle}>
                {value}
              </p>
            </Checkbox>
          )
        })}
      </DataWrapperColumnMenu>

      <ControlButtonsColumnMenu
        onClose={onClose}
        onChangeFullFieldMenuItem={() => onChangeFullFieldMenuItem(chosenItems, field)}
        onClickAccept={onClickAccept}
      />
    </div>
  )
})
