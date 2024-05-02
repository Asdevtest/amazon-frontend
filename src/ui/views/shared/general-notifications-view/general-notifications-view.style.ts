import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  datagridWrapper: {
    height: 'calc(100vh - 190px)',
    width: '100%',
  },

  actionPanelWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 450,
  },
}))
