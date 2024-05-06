import { makeStyles } from 'tss-react/mui'

import { fadeIn } from '@constants/theme/animations/fade-in'
import { fadeOut } from '@constants/theme/animations/fade-out'

export const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '100px',
    padding: '10px 10px 10px 15px',
  },

  input: {
    flex: 1,
  },

  crossIcon: {
    height: '10px !important',
    width: '10px !important',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '5px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  menuContainer: {
    display: 'none',
    position: 'absolute',

    top: '95px',

    width: '400px',

    zIndex: 20,
    padding: 5,

    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: '7px',

    animation: `${fadeOut} 0.3s ease-in-out`,

    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    background: theme.palette.background.general,
  },

  menuContainerAnimation: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    animation: `${fadeIn} 0.3s ease-in-out`,
  },

  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuItems: {
    maxHeight: '205px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  button: {
    padding: '0 10px',
    minHeight: '30px',
    width: 'calc(100% - 10px)',
    display: 'block',
    boxShadow: 'none',

    textAlign: 'left',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}))
