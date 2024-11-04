import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    width: '600px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: theme.palette.background.general,
    borderRadius: '16px',

    '.ant-form-item': {
      margin: 0,
    },
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  countries: {
    minHeight: '145px',
    maxHeight: '295px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
