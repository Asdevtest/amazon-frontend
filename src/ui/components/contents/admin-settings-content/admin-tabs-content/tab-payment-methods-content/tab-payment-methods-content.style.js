import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 20,
  },

  title: {
    width: '100%',
    margin: 0,
    fontSize: 18,
    lineHeight: 1.4,
  },

  container: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,

    '& > div:first-of-type': {
      width: 'max-content',
      margin: 0,
    },
  },

  textField: {
    width: 300,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  textFieldFullWidth: {
    width: 499,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  inputContainer: {
    width: 184,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 50%, transparent 50%), linear-gradient(to right, ${theme.palette.primary.main} 50%, transparent 50%), linear-gradient(to bottom, ${theme.palette.primary.main} 50%, transparent 50%), linear-gradient(to bottom, ${theme.palette.primary.main} 50%, transparent 50%)`,
    backgroundPosition: 'left top, left bottom, left top, right top',
    backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
    backgroundSize: '15px 1px, 15px 1px, 1px 15px, 1px 15px',
    backgroundColor: theme.palette.background.third,
    borderRadius: 4,
  },

  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },

  inputContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  text: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  icon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.primary.main,
  },

  deleteImage: {
    position: 'absolute',
    top: 0,
    right: 10,
    margin: 0,
    transform: 'translateY(calc(50%))',
    color: 'red',
    fontSize: 20,
    lineHeight: '20px',
    fontWeight: 500,
    cursor: 'pointer',

    '&:hover': {
      fontSize: 22,
    },
  },

  label: {
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  paymentMethods: {
    width: '100%',
    height: 170,
    margin: '10px 0',
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  paymentMethodWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  paymentMethod: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  iconsWrapper: {
    display: 'flex',
    gap: 5,
  },

  iconDelete: {
    padding: 3,

    '&:hover': {
      background: 'none',
    },
  },

  deletePaymentMethod: {
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  button: {
    minWidth: '123px !important',
  },

  buttonAdd: {
    minWidth: '112px !important',
  },
}))
