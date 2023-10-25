import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    flexDirection: 'column',
    height: '82.5vh',
  },
  placeAddBtnWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '5px',
    [theme.breakpoints.down(768)]: {
      paddingRight: '10px',
    },
  },

  btnsWrapper: {
    display: 'flex',
  },

  openArchiveBtn: {
    padding: '0 30px',
    color: theme.palette.primary.main,
  },

  addressMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  addressSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  addressMain: {
    color: theme.palette.text.general,
  },

  address: {
    color: theme.palette.text.second,
  },

  placeAddBtn: {
    width: '159px',
    height: '40px',
    marginLeft: 30,
    [theme.breakpoints.down(768)]: {
      width: '91px',
      marginLeft: 0,
    },
  },
}))
