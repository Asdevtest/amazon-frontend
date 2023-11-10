import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },

  userName: {
    maxWidth: 120,
  },
}))
