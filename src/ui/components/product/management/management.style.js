import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: 40,
    background: theme.palette.background.general,
    borderRadius: 4,
  },
}))
