import { FC, SyntheticEvent, memo } from 'react'

import { GridPinnedColumns } from '@mui/x-data-grid-premium'

import { CrossIcon } from '@components/shared/svg-icons'

import { useStyles } from './control-column-menu.style'

import { PinButton } from '../pin-button'

interface IControlColumnMenuProps {
  field: string
  pinnedColumns: GridPinnedColumns
  onClickCloseMenu: (event: SyntheticEvent<Element, Event>) => void
  onClickPinButton: (pinnedColumns: GridPinnedColumns) => void
}

export const ControlColumnMenu: FC<IControlColumnMenuProps> = memo(
  ({ field, pinnedColumns, onClickCloseMenu, onClickPinButton }) => {
    const { classes: styles } = useStyles()

    const isPinnedLeft = pinnedColumns?.left?.includes(field)
    const isPinnedRight = pinnedColumns?.right?.includes(field)

    const handlePinColumn = (isRightDirection: boolean, fieldName: string, isUnpin: boolean) => {
      const newPinnedColumns = { ...pinnedColumns }

      if (isUnpin) {
        for (const direction in newPinnedColumns) {
          if (direction) {
            const currentDirection = direction as keyof GridPinnedColumns
            newPinnedColumns[currentDirection] = newPinnedColumns?.[currentDirection]?.filter(el => el !== fieldName)
          }
        }
      } else {
        const sideToPin = isRightDirection ? 'right' : 'left'
        const sideToUnpin = isRightDirection ? 'left' : 'right'

        newPinnedColumns?.[sideToPin]?.push(fieldName)
        newPinnedColumns[sideToUnpin] = newPinnedColumns?.[sideToUnpin]?.filter(el => el !== fieldName)
      }

      onClickPinButton(newPinnedColumns)
    }

    return (
      <div className={styles.controlWrapper}>
        <div className={styles.pinButtonsWrapper}>
          <PinButton
            isPinned={isPinnedLeft}
            onClickButton={e => {
              onClickCloseMenu(e)
              handlePinColumn(false, field, !!isPinnedLeft)
            }}
          />
          <PinButton
            isRight
            isPinned={isPinnedRight}
            onClickButton={e => {
              onClickCloseMenu(e)
              handlePinColumn(true, field, !!isPinnedRight)
            }}
          />
        </div>

        <button onClick={onClickCloseMenu}>
          <CrossIcon className={styles.crossIcon} />
        </button>
      </div>
    )
  },
)
