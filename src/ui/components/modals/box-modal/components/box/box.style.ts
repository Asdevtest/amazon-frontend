import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  info: {
    height: 280,
    padding: 10,
    background: theme.palette.background.second,
    borderRadius: 20,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  checkboxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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

  skeleton: {
    width: '1040px !important',
    height: '280px !important',
  },
}))
