import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    height: 73,
    overflowY: 'auto',
    width: '100%',
  },

  columnCenter: {
    justifyContent: 'center',
  },

  userRole: {
    fontSize: 14,
    lineHeight: '19px',
  },
}))
