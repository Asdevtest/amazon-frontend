import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '500px',
    [theme.breakpoints.down(768)]: {
      minWidth: 0,
      width: '280px',
    },
  },

  modalTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,

    fontWeight: 600,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },

  button: { width: '121px', height: '40px' },

  closeButton: {
    color: theme.palette.text.general,
  },

  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',

    padding: 0,
  },

  form: {
    marginTop: '20px',
  },

  btnsWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
  fieldLabel: {
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
  },
}))
