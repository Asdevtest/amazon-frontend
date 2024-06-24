import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'flex-start',
  },

  dataGridWrapper: {
    marginTop: 20,
    height: '82vh',
    width: '100%',
  },
}))
