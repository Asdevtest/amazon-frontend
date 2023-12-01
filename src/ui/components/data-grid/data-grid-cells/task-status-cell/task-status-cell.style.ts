import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  statusWrapper: {
    display: 'flex',
    justifyContent: 'start',
  },

  orderStatusText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '400',
  },
}))
