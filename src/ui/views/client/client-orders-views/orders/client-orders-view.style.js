import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    padding: '0 25px',
  },

  invis: {
    width: 261,
  },

  topHeaderBtnsSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '400px',
    height: 36,
    overflow: 'visible',
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
