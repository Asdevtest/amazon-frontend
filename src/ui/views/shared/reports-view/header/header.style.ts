import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  datePicker: {
    width: 290,
  },

  searchInput: {
    marginRight: 'auto',
  },
}))
