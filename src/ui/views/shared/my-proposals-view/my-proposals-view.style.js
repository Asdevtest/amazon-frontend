import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  dataGridWrapper: {
    height: '72vh',
    width: '100%',
  },

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchInput: {
    width: 350,
  },
}))
