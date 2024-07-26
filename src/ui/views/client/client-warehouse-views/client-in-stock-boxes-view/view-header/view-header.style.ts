import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  viewHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  searchInput: {
    width: 600,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
}))
