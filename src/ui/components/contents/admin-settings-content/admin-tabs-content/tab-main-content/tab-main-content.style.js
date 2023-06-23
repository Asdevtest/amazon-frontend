import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    gap: 30,
  },

  textFileds: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    '> div': {
      margin: 0,
    },
  },

  textField: {
    width: 410,
    height: 40,
    color: theme.palette.text.general,
    outline: 'none',
    border: '1px solid var(--light-thin-lines, #E0E0E0)',
    borderRadius: 4,
  },

  label: {
    marginBottom: 10,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  proxyContent: {
    width: 410,
    display: 'flex',
    flexDirection: 'column',
  },

  proxyList: {
    width: '100%',
    height: 160,
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 18,
  },

  proxyWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  proxy: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  iconsWrapper: {
    display: 'flex',
    gap: 5,
  },

  iconDelete: {
    padding: 1,

    '&:hover': {
      background: 'none',
    },
  },

  deleteProxy: {
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },

  button: {
    minWidth: '123px !important',
  },
}))
