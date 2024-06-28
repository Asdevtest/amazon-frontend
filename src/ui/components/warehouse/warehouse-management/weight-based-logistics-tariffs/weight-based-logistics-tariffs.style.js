import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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
  },

  btnsWrapper: {
    display: 'flex',
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
}))
