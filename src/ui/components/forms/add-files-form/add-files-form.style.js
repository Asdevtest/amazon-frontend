import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'flex-end',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
