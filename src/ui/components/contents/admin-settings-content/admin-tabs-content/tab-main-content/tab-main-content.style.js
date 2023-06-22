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
    padding: '15px 7px',
    fontSize: 16,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  proxyField: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,
  },

  btnAddProxy: {
    width: 112,
    height: 40,
    marginBottom: 20,
  },

  proxyList: {
    width: '100%',
    height: 155,
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 20,
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

  deleteProxy: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },

  saveProxyButton: {
    width: 123,
    height: 40,
  },
}))
