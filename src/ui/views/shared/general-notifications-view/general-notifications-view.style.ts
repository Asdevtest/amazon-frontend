import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttonsWrapper: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  actionPanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 500,
  },
}))
