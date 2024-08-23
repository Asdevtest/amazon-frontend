import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '500px',
  },

  modalTitle: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,

    fontWeight: 600,
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
    marginRight: 15,

    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
  },
}))
