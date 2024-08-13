import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  dataGridWrapper: {
    marginTop: '20px',
    height: '80vh',
    width: '100%',
  },

  tablePanelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
