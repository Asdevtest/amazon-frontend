import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  modalHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  icon: {
    marginLeft: '16px',
  },

  boxesWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  divider: {
    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },
  },

  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '20px',
  },

  noImageText: {
    color: theme.palette.text.red,
  },
}))
