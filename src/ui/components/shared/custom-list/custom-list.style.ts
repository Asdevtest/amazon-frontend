import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  listItem: {
    padding: 0,
  },

  listItemText: {
    marginLeft: '22px',
  },

  listTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  dot: {
    color: theme.palette.primary.main,
  },
}))
