import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 300,
  },

  infoBlock: {
    height: 270,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontWeight: 600,
  },

  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },

  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  fieldText: {
    fontSize: 14,
    lineHeight: '23px',
    color: theme.palette.text.general,

    '&:hover': {
      opacity: 1,
    },
  },

  userMiniCellWrapper: {
    padding: 0,
  },

  userMiniCellAvatar: {
    width: 19,
    height: 19,
  },

  tafiffButton: {
    width: 115,
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    p: {
      color: '#fff',
      fontSize: 14,
      lineHeight: '19px',
      maxWidth: '90%',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },
}))
