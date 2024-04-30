import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 576,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      gap: 10,
    },
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      fontSize: 16,
      lineHeight: '22px',
    },
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(768)]: {
      fontSize: 12,
    },
  },

  mainWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,

    '& > div:first-of-type': {
      width: '100%',

      '& > div': {
        width: '100% !important',
      },
    },

    [theme.breakpoints.down(768)]: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 15,
    },
  },

  avatar: {
    width: 180,
    height: 180,
    borderRadius: '50%',

    [theme.breakpoints.down(768)]: {
      width: 160,
      height: 160,
    },
  },

  textsWrapper: {},

  standartText: {
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
    },
  },

  successText: {
    color: '#00B746',
  },

  spanText: {
    color: theme.palette.primary.main,
  },

  btnsWrapper: {
    display: 'flex',
    gap: 30,
    justifyContent: 'flex-end',

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
    },
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
}))
