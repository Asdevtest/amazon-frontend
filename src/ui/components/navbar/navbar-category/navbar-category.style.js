import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      // position: 'relative',
      height: '50px',
      fontSize: '13px',
      lineHeight: '15px',
      fontWeight: 500,
      color: theme.palette.text.primary,
      borderLeft: `5px solid transparent`,
      paddingRight: '16px',
      transition: '0.3s ease',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

      '&$selected': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: 'transparent',
      },
      '&$selected:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
      },
      '&:hover': {backgroundColor: 'rgba(0,123,255,0.3)'},
    },
    selected: {
      color: theme.palette.primary.main,
      background: 'linear-gradient(90deg, rgba(0, 108, 255, 0.2) 0%, rgba(0, 108, 255, 0) 100%)',
    },

    selectedIcon: {
      color: theme.palette.primary.main,
    },
    notSelected: {
      // color: 'rgba(189, 194, 209, 1)',
      color: '#001029',
    },
    iconWrapper: {
      // position: 'relative',
      minWidth: '0',
      margin: '16px 16px 16px 11px',
    },
    badge: {
      position: 'absolute',
      top: 2,
      left: 25,
      height: 18,
      width: 18,
      backgroundColor: '#006CFF',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '14px',
    },

    icon: {
      backgroundColor: 'none',
      // color: '#007bff'
    },

    menuItem: {
      overflow: 'hidden',

      width: '100%',
      borderRadius: 0,
      padding: 0,
      display: 'inline-flex',
      backgroundColor: 'inherit',

      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: 'inherit',
      },
    },
  })
