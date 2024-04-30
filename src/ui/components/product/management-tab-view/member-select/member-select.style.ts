import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  selectWrapper: {
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  title: {
    margin: 0,
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '19px',
  },

  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  select: {
    width: 216,
    height: 40,

    '& > div': {
      padding: '6px 10px',
    },
  },

  saveIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  disableIcon: {
    opacity: 0,
  },
}))
