import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  balanceTitle: {
    fontSize: 32,
    lineHeight: '40px',
  },

  balanceFreeze: {
    fontSize: 32,
    lineHeight: '40px',
    color: '#c4c4c4',
    marginLeft: 30,
  },

  title: {
    fontSize: 18,
    lineHeight: '140%',
  },
}))
