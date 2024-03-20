import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tooltip: {
    maxHeight: 300,
    overflow: 'auto',
    margin: '0 !important',
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: 10,
  },

  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  items: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 3,
  },

  itemImage: {
    height: 32,
    width: 32,
    objectFit: 'contain',
    borderRadius: 4,
  },

  itemText: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  itemTextPoints: {
    fontSize: 18,
    lineHeight: '25px',
  },

  error: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 600,
    color: theme.palette.text.red,
  },

  tooltipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
}))
