import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    // minHeight: '36px !important',
    minWidth: '36px !important',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    // color: theme.palette.text.negativeMain,
    color: '#fff',
    // color: '#fff !important',

    height: 40,
    // padding: '11px 25px 10px', ломает все кнопки
    fontSize: 14,
  },

  success: {
    // color: `${theme.palette.text.negativeMain} !important`,
    // color: '#fff',

    backgroundColor: '#009a07 !important',
    '&:hover': {
      backgroundColor: '#1E7422 !important',

      '@media (hover: none)': {
        backgroundColor: '#1E7422 !important',
      },
    },
    '&: disabled': {
      backgroundColor: 'rgba(15, 169, 20, 0.5) !important',
    },
  },
  danger: {
    color: '#fff !important',

    // color: `${theme.palette.text.negativeMain} !important`,
    // color: '#fff',

    // background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    background: '#DD2121',

    '&:hover': {
      backgroundColor: '#8C0000 !important',

      '@media (hover: none)': {
        backgroundColor: '#8C0000 !important',
      },
    },
    '&:disabled': {
      background: '#4F2026',
      // background: 'linear-gradient(180deg, #FF1616 100%, #DF0C0C 100%)',
    },
  },
  // disabled: { работает
  // backgroundColor: '#a0a0a4 !important',
  // color: theme.palette.text.general,
  // backgroundColor: `${theme.palette.background.disabled} !important`,
  // },

  text: {
    color: theme.palette.text.general,
  },

  tooltipsWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-15px',
    zIndex: '10',

    display: 'flex',
    justifyContent: 'flex-end',
  },

  tooltipsCenterWrapper: {
    position: 'absolute',
    top: 'calc(50% - 10.5px)',
    right: '10px',
    zIndex: '10',

    display: 'flex',
    justifyContent: 'flex-end',
  },

  tooltip: {
    width: '15px',
    height: '15px',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipCenter: {},

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },

  btnWrapper: {
    position: 'relative',
    display: 'inline',
  },
}))
