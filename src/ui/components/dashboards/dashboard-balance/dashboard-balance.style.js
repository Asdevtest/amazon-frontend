import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  balanceTitle: {
    fontSize: 46,
    lineHeight: '54px',
    color: '#001029',
  },

  balanceFreeze: {
    fontSize: '46px',
    lineHeight: '53px',
    color: '#c4c4c4',
    marginLeft: 28,
  },

  title: {
    fontSize: 18,
    color: '#001029',
    marginBottom: 20,
  },
}))
