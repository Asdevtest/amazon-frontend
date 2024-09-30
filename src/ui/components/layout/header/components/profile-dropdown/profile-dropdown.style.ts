import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  userContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  text: {
    fontSize: '14px',
    lineHeight: '19px',
  },
}))
