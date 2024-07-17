import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  invis: {
    width: 261,
  },

  topHeaderBtnsSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  searchInput: {
    width: 550,
  },

  topHeaderBtnsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  tableWrapper: {
    height: '79vh',
    width: '100%',
  },
}))
