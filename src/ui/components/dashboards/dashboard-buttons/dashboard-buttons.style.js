import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  balanceTitle: {
    fontSize: 36,
    lineHeight: '49px',
    color: '#001029',
  },

  balanceFreeze: {
    fontSize: '36px',
    lineHeight: '49px',
    color: '#c4c4c4',
    marginLeft: 28,
  },

  title: {
    fontSize: 14,
    color: theme.palette.text.second,
    lineHeight: '19px',
    marginTop: '12px',
  },
  fontSizeLarge: {
    width: '45px',
    height: '44px',

    color: theme.palette.text.general,
    // '&:hover': {
    //   transform: 'scale(1.1)',
    // },
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '97px',
    height: '97px',
    borderRadius: '50%',
    // backgroundColor: '#F8F8F8',
    backgroundColor: theme.palette.background.second,

    // boxShadow: '0px 0px 14px 6px rgba(184, 184, 184, 0.18), inset -4px -4px 13px rgba(135, 135, 135, 0.15)',

    boxShadow: `0px 0px 14px 6px ${theme.palette.boxShadow.main}, inset -4px -4px 13px ${theme.palette.boxShadow.main}`,

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },

    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 5,
    height: 28,
    width: 28,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.negativeMain,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '54px',
    height: '145px',
    marginRight: '250px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '@media (max-width: 768px)': {
    fontSizeLarge: {
      width: '29px',
      height: '28px',
      // '&:hover': {
      //   transform: 'scale(1.1)',
      // },
    },
    iconWrapper: {
      width: '62px',
      height: '62px',
    },
    buttonsWrapper: {
      width: '100%',
      alignItems: 'start',
      justifyContent: 'space-around',
      // gap: '40px',
      height: '100px',
      marginRight: 0,
    },
    badge: {
      height: 17,
      width: 17,
    },
    title: {
      fontSize: 12,
      color: '#001029',
      lineHeight: '16px',
      marginTop: '12px',
      maxWidth: '62px',
      textAlign: 'center',
    },
  },
}))
