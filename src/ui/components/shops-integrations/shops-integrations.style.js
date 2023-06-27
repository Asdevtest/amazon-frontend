import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  shopWrapper: {
    height: '100%',
    padding: '0 10px',
    background: theme.palette.background.second,
  },

  root: {
    width: '100%',
  },

  indicator: {
    backgroundColor: '#1da1f2',
  },
}))
