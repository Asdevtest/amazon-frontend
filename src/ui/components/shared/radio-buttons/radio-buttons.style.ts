import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: '45px',
  },

  verticalRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  radioRoot: {
    '& > span > svg': {
      width: 20,
      height: 20,
    },
  },

  radioActive: {
    '& > span > svg': {
      color: theme.palette.primary.main,
    },
  },
}))
