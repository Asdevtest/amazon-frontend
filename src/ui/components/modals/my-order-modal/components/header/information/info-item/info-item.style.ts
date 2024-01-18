import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  icon: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: theme.palette.background.second,
    boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.17)',
  },

  title: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  value: {
    textAlign: 'right',
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },
}))
