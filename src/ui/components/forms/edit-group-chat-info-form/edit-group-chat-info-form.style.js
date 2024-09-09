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

  editImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarContainer: {
    height: 150,
    width: 150,
  },
}))
