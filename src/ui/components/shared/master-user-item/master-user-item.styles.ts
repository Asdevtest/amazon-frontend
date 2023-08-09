import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },

  userAvatar: {
    width: '28px',
    height: '28px',
  },

  userName: {
    fontSize: '14px',
    fontWeight: 600,
  },

  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  rating: {
    fontSize: '14px',
    fontWeight: 400,
  },
}))
