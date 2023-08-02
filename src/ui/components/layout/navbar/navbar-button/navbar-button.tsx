import { cx } from '@emotion/css'
import MenuIcon from '@material-ui/icons/Menu'
import { FC, memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

import { useNavbarButtonStyles } from '@components/layout/navbar/navbar-button/navbar-button.styles'

interface NavbarButtonProps {
  shortNavbar: boolean
  showOverlayNavBar: boolean
  setShortNavbar: (arg: boolean) => void
  setShowOverlayNavBar: (arg: boolean) => void
}

export const NavbarButton: FC<NavbarButtonProps> = memo(
  ({ shortNavbar, showOverlayNavBar, setShortNavbar, setShowOverlayNavBar }) => {
    const { classes: styles } = useNavbarButtonStyles()

    return (
      <div className={cx(styles.iconButtonWrapper, { [styles.iconButtonWrapperLeft]: !shortNavbar })}>
        <IconButton
          onClick={() => {
            setShortNavbar(!shortNavbar)
            setShowOverlayNavBar(!showOverlayNavBar)
          }}
        >
          {shortNavbar ? <MenuIcon /> : <CloseIcon className={styles.closeIcon} />}
        </IconButton>
      </div>
    )
  },
)
