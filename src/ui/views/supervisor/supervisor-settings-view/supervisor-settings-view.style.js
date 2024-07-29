import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '82vh',
    width: '100%',
  },
}))
