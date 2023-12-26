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
    WebkitJustifyContent: 'center',
    borderRadius: '50%',
    background: '#f4f7fe',
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
