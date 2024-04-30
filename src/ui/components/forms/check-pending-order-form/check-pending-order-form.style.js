import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 485,
    minHeight: '150px',
    maxHeight: '900px',
    overflowY: 'auto',

    display: 'flex',
    flexDirection: 'column',
  },

  warning: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '22px',
    lineHeight: '26px',

    color: theme.palette.general,
    marginBottom: '15px',
  },
  text: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '140%',
  },
  orderInfo: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },

  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 20,
  },
  asinsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
    marginBottom: '15px',
  },
  CancelBtn: {},
}))
