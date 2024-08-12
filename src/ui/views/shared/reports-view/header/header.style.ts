import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  datePicker: {
    width: 320,
  },

  searchInput: {
    width: 440,
    marginRight: 'auto',
  },
}))
