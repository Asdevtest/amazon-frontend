import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    gap: '10px',
    alignItems: 'center',
  },

  userAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '49px',
  },

  userName: {
    fontSize: '14px',
    fontWeight: 600,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

  ratingIcon: {
    width: '13px !important',
    height: '11px !important',
    color: '#faaf00',
  },
}))
