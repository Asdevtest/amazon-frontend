import { FC, memo } from 'react'
import { useNavbarButtonStyles } from '@components/layout/navbar/navbar-button/navbar-button.styles'
import { cx } from '@emotion/css'
import { IconButton } from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@mui/icons-material/Close'

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
