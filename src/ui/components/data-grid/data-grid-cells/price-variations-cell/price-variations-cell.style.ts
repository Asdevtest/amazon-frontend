import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '10px 0',
  },

  variations: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 5,
    maxHeight: '58px',
    overflow: 'auto',
  },

  text: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.general,
  },
}))
