import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  inputList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
