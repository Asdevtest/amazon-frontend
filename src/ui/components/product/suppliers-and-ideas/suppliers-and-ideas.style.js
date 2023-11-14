import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    minHeight: '40vh',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  emptyTableWrapper: {
    width: '100%',
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 30,
  },

  emptyTableText: {
    color: theme.palette.text.second,
  },
}))
