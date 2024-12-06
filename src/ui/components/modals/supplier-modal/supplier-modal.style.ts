import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '1090px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  reviews: {
    maxHeight: 'unset',
    flex: 1,
    paddingRight: '0px',
  },

  tabsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
}))
