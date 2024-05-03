import { FC, SyntheticEvent, memo } from 'react'

import { PinArrowIcon, PinIcon, UnPinIcon } from '@components/shared/svg-icons'

import { useStyles } from './pin-button.style'

interface IPinButtonProps {
  isRight?: boolean
  isPinned?: boolean
  onClickButton: (e: SyntheticEvent) => void
}

export const PinButton: FC<IPinButtonProps> = memo(({ isRight, isPinned, onClickButton }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <button className={styles.buttonWrapper} onClick={onClickButton}>
      {isPinned ? (
        <UnPinIcon className={cx(styles.pinIcon, styles.unpinIcon)} />
      ) : (
        <>
          <PinIcon className={styles.pinIcon} />
          <PinArrowIcon className={cx(styles.pinArrowIcon, { [styles.rightDirection]: isRight })} />
        </>
      )}
    </button>
  )
})
