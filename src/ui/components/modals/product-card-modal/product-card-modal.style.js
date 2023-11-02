import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 1640,
    height: 730,
    overflowY: 'auto',
  },

  clippedRoot: {
    height: '660px',
  },

  footerWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
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
