import { FC, SyntheticEvent, memo } from 'react'

import { GridPinnedPosition, useGridApiContext } from '@mui/x-data-grid-premium'

import { CrossIcon } from '@components/shared/svg-icons'

import { useStyles } from './control-column-menu.style'

import { PinButton } from '../pin-button'

interface IControlColumnMenuProps {
  field: string
  onClickCloseMenu: (event: SyntheticEvent<Element, Event>) => void
}

export const ControlColumnMenu: FC<IControlColumnMenuProps> = memo(({ field, onClickCloseMenu }) => {
  const { classes: styles } = useStyles()

  const { current: apiRef } = useGridApiContext()

  const pinSide = apiRef?.isColumnPinned(field)

  const isPinnedLeft = pinSide === GridPinnedPosition.left
  const isPinnedRight = pinSide === GridPinnedPosition.right

  const handlePinColumn = (direction: GridPinnedPosition, isUnpin: boolean) => {
    if (isUnpin) {
      apiRef.unpinColumn(field)
    } else {
      apiRef?.pinColumn(field, direction)
    }
  }

  return (
    <div className={styles.controlWrapper}>
      <div className={styles.pinButtonsWrapper}>
        <PinButton
          isPinned={isPinnedLeft}
          onClickButton={e => {
            onClickCloseMenu(e)
            handlePinColumn(GridPinnedPosition.left, !!isPinnedLeft)
          }}
        />
        <PinButton
          isRight
          isPinned={isPinnedRight}
          onClickButton={e => {
            onClickCloseMenu(e)
            handlePinColumn(GridPinnedPosition.right, !!isPinnedRight)
          }}
        />
      </div>

      <button onClick={onClickCloseMenu}>
        <CrossIcon className={styles.crossIcon} />
      </button>
    </div>
  )
})
