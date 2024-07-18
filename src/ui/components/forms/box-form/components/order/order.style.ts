import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    overflow: 'hidden',
    background: theme.palette.background.second,
    borderRadius: 20,
  },
}))
