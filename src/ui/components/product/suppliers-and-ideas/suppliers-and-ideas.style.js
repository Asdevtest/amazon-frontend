import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    gap: 30,
    width: '100%',
    background: theme.palette.background.general,
  },

  btnsWrapper: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTableText: {
    marginTop: '30px',
    color: theme.palette.text.second,
  },
}))
