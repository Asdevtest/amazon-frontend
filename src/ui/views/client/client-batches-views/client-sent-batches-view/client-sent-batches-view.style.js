import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  searchInput: {
    width: 410,
  },

  boxesFiltersWrapper: {
    marginTop: 20,
  },

  datagridWrapper: {
    marginTop: 20,
    height: '73vh',
    width: '100%',
  },
}))
