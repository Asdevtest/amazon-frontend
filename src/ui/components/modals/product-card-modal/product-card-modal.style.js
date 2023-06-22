/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1640,
    height: 740,
    overflowY: 'auto',
  },

  footerWrapper: {
    marginTop: 30,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  shareWrapper: {
    display: 'flex',
    gap: 10,

    cursor: 'pointer',
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '21px !important',
    height: '21px !important',
  },

  shareLinkText: {
    color: theme.palette.primary.main,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 10,
  },

  buttonNormalNoMargin: {
    marginRight: 0,
  },

  buttonClose: {
    flexGrow: 1,
    width: '100%',
    color: '#fff',
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    '&:hover': {
      backgroundColor: '#c51a1c',
      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },

  restoreBtn: {
    flexGrow: 1,
    marginLeft: '15px',
  },

  buttonDelete: {
    flexGrow: 1,
    width: '100%',
    color: '#fff',
    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    '&:hover': {
      backgroundColor: '#c51a1c',
      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },

  buttonNormal: {
    flexGrow: 1,
    width: '100%',
  },

  buttonAccept: {
    backgroundColor: '#00B746',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#00B746',
    },
  },
}))
