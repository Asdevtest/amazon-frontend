import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: 14,
    color: theme.palette.text.second,
    lineHeight: '19px',
    marginTop: '12px',
    [theme.breakpoints.down(768)]: {
      fontSize: 12,
      color: theme.palette.text.general,
      lineHeight: '16px',
      marginTop: '12px',
      maxWidth: '62px',
      textAlign: 'center',
    },
  },
  fontSizeLarge: {
    width: '45px',
    height: '44px',

    color: theme.palette.text.general,
    // '&:hover': {
    //   transform: 'scale(1.1)',
    // },
    [theme.breakpoints.down(768)]: {
      width: '29px',
      height: '28px',
    },
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '97px',
    height: '97px',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.second,
    // backgroundColor: theme.palette.background.third,

    cursor: 'pointer',

    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },

    position: 'relative',
    [theme.breakpoints.down(768)]: {
      width: '62px',
      height: '62px',
    },
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 5,
    height: 28,
    minWidth: 28,
    width: 'fit-content',
    padding: '1px 6px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    [theme.breakpoints.down(768)]: {
      height: 17,
      width: 17,
    },
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '54px',
    height: '145px',
    marginRight: '245px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      alignItems: 'start',
      justifyContent: 'space-around',
      height: '100px',
      marginRight: 0,
    },
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}))
