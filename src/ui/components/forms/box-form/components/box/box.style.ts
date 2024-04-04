import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  info: {
    padding: 10,
    background: theme.palette.background.second,
    boxShadow: '0 0 4px 4px rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
  },

  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  checkboxes: {
    height: 195,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },

  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  userIcon: {
    height: 24,
    width: 24,
    borderRadius: '50%',
  },

  checkbox: {
    padding: 0,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))
