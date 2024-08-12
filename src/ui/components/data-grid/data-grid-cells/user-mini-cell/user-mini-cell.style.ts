import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
  },

  avatar: {
    width: 24,
    height: 24,
    borderRadius: '50%',
  },

  userName: {
    maxWidth: 120,
  },

  onlineIcon: {
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 10,
      right: -1,
      width: 7,
      height: 7,
      backgroundColor: '#28a745',
      borderRadius: '50%',
    },
  },
}))
