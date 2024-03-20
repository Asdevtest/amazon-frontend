import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '700px',
    padding: 20,
  },
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
  },

  linkWrapper: {
    display: 'flex',
    gap: '5px',

    '& > :nth-of-type(n)': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
    },
    '& > :first-of-type': {
      color: theme.palette.text.general,
    },
    marginBottom: '30px',
  },

  idWrapper: {
    display: 'flex',
    gap: '15px',
    '& > :nth-of-type(n)': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
    },
    '& > :first-of-type': {
      color: theme.palette.text.second,
    },
    alignItems: 'center',
    marginBottom: '30px',
  },

  copyWrapper: {
    display: 'flex',
    gap: '13px',
    alignItems: 'center',

    '& > :first-of-type': {
      fontSize: '14px',
      lineHeight: '19px',
      fontWeight: 400,
      color: theme.palette.text.general,
    },
  },

  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
  },

  button: {
    width: '179px',
    height: '40px',
  },
  cancelButton: {
    color: theme.palette.text.general,
  },
}))
