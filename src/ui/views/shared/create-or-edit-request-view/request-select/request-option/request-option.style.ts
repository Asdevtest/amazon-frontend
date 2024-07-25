import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  row: {
    display: 'flex',
    gap: 5,
  },

  optionImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
    boxShadow: theme.palette.boxShadow.paper,
  },

  text: {
    fontSize: 12,
    lineHeight: '15px',
  },

  textSecond: {
    color: theme.palette.text.second,
  },

  textBold: {
    fontWeight: 600,
  },

  background: {
    padding: '1px 5px',
    background: theme.palette.background.general,
    borderRadius: 8,
  },

  fixWidth: {
    width: 'max-content',
    maxWidth: 150,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
