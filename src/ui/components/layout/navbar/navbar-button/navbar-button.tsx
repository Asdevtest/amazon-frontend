import React from 'react'
import { useNavbarButtonStyles } from '@components/layout/navbar/navbar-button/navbar-button.styles'
import { cx } from '@emotion/css'
import { IconButton } from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@mui/icons-material/Close'

interface NavbarButtonProps {
  shortNavbar: boolean
  setShortNavbar: (arg: boolean) => void
  setShowOverlayNavBar: (arg: boolean) => void
  showOverlayNavBar: boolean
}

export const NavbarButton = (props: NavbarButtonProps) => {
  const { shortNavbar, setShortNavbar, showOverlayNavBar, setShowOverlayNavBar } = props

  const { classes: styles } = useNavbarButtonStyles()

  return (
    <div className={cx(styles.iconButtonWrapper, { [styles.iconButtonWrapperLeft]: !shortNavbar })}>
      {shortNavbar && (
        <IconButton
          onClick={() => {
            setShortNavbar(!shortNavbar)
            setShowOverlayNavBar(!showOverlayNavBar)
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!shortNavbar && (
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => {
            setShortNavbar(!shortNavbar)
            setShowOverlayNavBar(!showOverlayNavBar)
          }}
        />
      )}
    </div>
  )
}
