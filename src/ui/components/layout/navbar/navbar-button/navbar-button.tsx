import MenuIcon from '@material-ui/icons/Menu'
import { FC, memo } from 'react'

import { IconButton } from '@mui/material'

import { useClassNames } from './navbar-button.styles'

interface NavbarButtonProps {
  shortNavbar: boolean
  showOverlayNavBar: boolean
  setShortNavbar: (arg: boolean) => void
  setShowOverlayNavBar: (arg: boolean) => void
}

export const NavbarButton: FC<NavbarButtonProps> = memo(
  ({ shortNavbar, showOverlayNavBar, setShortNavbar, setShowOverlayNavBar }) => {
    const { classes: styles } = useClassNames()

    return (
      <div className={styles.iconButtonWrapper}>
        <IconButton
          onClick={() => {
            setShortNavbar(!shortNavbar)
            setShowOverlayNavBar(!showOverlayNavBar)
          }}
        >
          {shortNavbar && <MenuIcon />}
        </IconButton>
      </div>
    )
  },
)
