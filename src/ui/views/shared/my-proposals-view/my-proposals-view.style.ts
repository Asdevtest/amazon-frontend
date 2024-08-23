import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    width: '100%',
    height: '100%',
  },

  dataGridWrapper: {
    flex: 1,
    padding: '3px',
    overflow: 'auto',
    width: '100%',
  },

  tablePanelWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
