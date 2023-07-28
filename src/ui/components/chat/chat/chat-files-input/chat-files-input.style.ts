import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: 170,
    padding: '10px 50px',
    background: theme.palette.background.general,
  },
}))
