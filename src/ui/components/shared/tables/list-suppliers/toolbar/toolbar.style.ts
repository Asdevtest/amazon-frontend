import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  toolbar: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  tableTitle: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },

  actionsButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  visibilityButton: {
    width: 32,
    height: 32,
    padding: 0,
    borderRadius: '50%',
  },

  visibilityIcon: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.primary.main,
  },
}))
