import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
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
    color: '#001029',
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

  redRow: {
    color: 'red',
  },

  greenRow: {
    color: 'green',
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
