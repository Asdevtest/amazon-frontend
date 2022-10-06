import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.005)',
    },
  },
  datagridWrapper: {
    marginTop: '10px',
    height: '79vh',
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: '#fff',

    backgroundColor: theme.palette.background.main,
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',
  },
  footerCell: {
    padding: 0,
    margin: 0,
  },
  toolbarContainer: {
    height: '52px',
  },
}))
