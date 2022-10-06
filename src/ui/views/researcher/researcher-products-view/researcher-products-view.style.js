import {createStyles} from '@material-ui/core'

// import {createStyles} from '@mui/material/styles'

// import {createStyles} from '@mui/styles'

// import { makeStyles } from 'tss-react/mui';

export const styles = createStyles(theme => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',

    backgroundColor: theme.palette.background.main,
  },
  formWrapper: {
    marginTop: '32px',
  },
  tableWrapper: {
    marginTop: '32px',
    width: '100%',
    height: '45vh',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  root: {
    border: '0 !important',
    boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    // backgroundColor: '#fff',

    backgroundColor: theme.palette.background.main,
    color: `${theme.palette.text.general} !important`,
  },

  footerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTop: 'none !important',

    // color: theme.palette.text.general,
    color: `${theme.palette.text.general} !important`,
  },
  footerCell: {
    padding: 0,
    margin: 0,
    color: `${theme.palette.text.general} !important`,
    // color: theme.palette.text.general,
  },
  toolbarContainer: {
    height: '52px',
    color: `${theme.palette.text.general} !important`,
  },

  pagination: {
    color: `${theme.palette.text.general} !important`,
  },
}))
