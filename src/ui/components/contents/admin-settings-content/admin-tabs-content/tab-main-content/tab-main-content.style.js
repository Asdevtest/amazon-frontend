import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  textField: {
    width: '100%',
    minHeight: '40px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',

    fontWeight: '400',
    lineHeight: '1.5',
  },

  placeAddBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '20px',
    marginBottom: '20px',
  },

  proxyButtonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '20px',
  },

  submitButton: {
    width: '165px',
    height: '40px',
  },

  proxyField: {
    display: 'flex',
    alignItems: 'start',
  },

  proxyFieldText: {
    marginBottom: '12px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.general,
  },

  proxyFieldTextUnSelection: {
    marginBottom: '12px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.general,
    userSelect: 'none',
  },

  textFieldUnSelection: {
    width: '100%',
    minHeight: '40px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',

    fontWeight: '400',
    lineHeight: '1.5',

    '& > ::selection': {
      userSelect: 'none',
    },
  },

  unselectable: {
    userSelect: 'none',
  },
  proxyWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '22px',
  },

  proxiesWrapper: {
    height: '100%',
  },

  halfProxiesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '275px',
    overflow: 'hidden',
  },
  proxySubWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  proxy: {
    color: theme.palette.primary.main,
    fontSize: '16px',
    lineHeight: '19px',
  },

  deleteProxy: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.07)',
    },
  },
  tablePanelSortWrapper: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',

    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },
  tablePanelViewText: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.primary.main,

    marginRight: '15px',
  },
  disabledTablePanelSortWrapper: {
    cursor: 'default',
  },
  iconsWrapper: {
    display: 'flex',
  },
}))
