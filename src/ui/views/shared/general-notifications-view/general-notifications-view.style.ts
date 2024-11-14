import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  actionPanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    gap: '10px',
  },

  searchInput: {
    width: 500,
  },
}))
