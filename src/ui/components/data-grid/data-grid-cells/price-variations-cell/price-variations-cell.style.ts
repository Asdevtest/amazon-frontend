import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 5,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))
