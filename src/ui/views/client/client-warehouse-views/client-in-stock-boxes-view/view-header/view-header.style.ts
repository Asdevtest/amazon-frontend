import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  viewHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  searchInput: {
    width: 600,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))
