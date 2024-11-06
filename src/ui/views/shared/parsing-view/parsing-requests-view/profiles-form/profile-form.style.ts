import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  searchInput: {
    width: '100%',
  },

  optionsWrapper: {
    height: '220px',
    overflowY: 'auto',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))
