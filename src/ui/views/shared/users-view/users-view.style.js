import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.primary,
    marginBottom: 30,
  },
}))
