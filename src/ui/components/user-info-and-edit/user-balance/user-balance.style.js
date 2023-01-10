import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    // display: 'flex',
    // gap: '10px',
    width: '100%',
    // height: '100%'
    // flexDirection: 'column',
    // minHeight: '85vh',
  },
  example: {
    color: theme.palette.primary,
  },
  balanceTitle: {
    fontSize: 46,
    lineHeight: '54px',
    color: theme.palette.text.general,
  },
  balanceFreeze: {
    fontSize: '34px',
    lineHeight: '40px',
    color: '#FFC7C7',
    marginLeft: 70,
  },

  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '68vh',
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  redRow: {
    color: 'red',
  },

  greenRow: {
    color: theme.palette.text.green,
  },

  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  button: {
    padding: '14px 40px',
  },

  depositBtn: {
    marginRight: 50,
  },
}))
