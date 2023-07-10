import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    width: 620,
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
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,

    '& > div:first-of-type': {
      margin: 0,
    },
  },

  textField: {
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  inputContainer: {
    width: 180,
    height: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
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

  text: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  icon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.primary.main,
  },

  label: {
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  containerImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    border: `1px solid #0B903E`,
    borderRadius: 8,

    '& > img': {
      width: 83,
      height: 73,
      borderRadius: 4,
    },
  },

  error: {
    border: `1px solid #D70D0D`,
  },

  actionIconWrapper: {
    display: 'flex',
    gap: 10,
    cursor: 'pointer',
  },

  actionIcon: { position: 'relative' },

  paymentMethodLabel: {
    maxWidth: 73,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
    color: theme.palette.text.second,
  },

  paymentMethods: {
    width: '100%',
    height: 170,
    margin: '10px 0',
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  paymentMethodWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  iconImage: {
    width: 32,
    height: 32,
    fontSize: 10,
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

  deleteIcon: {
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
