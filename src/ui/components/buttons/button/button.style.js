import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    // minHeight: '36px !important',
    minWidth: '36px !important',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    // color: theme.palette.text.negativeMain,
    // color: '#fff',

    height: 40,
    // padding: '11px 25px 10px', ломает все кнопки
    fontSize: 14,
  },

  success: {
    // color: `${theme.palette.text.negativeMain} !important`,
    // color: '#fff',

    backgroundColor: '#009a07 !important',
    '&:hover': {
      backgroundColor: '#4caf50 !important',

      '@media (hover: none)': {
        backgroundColor: '#4caf50 !important',
      },
    },
    '&: disabled': {
      backgroundColor: 'rgba(15, 169, 20, 0.5) !important',
    },
  },
  danger: {
    // color: `${theme.palette.text.negativeMain} !important`,
    // color: '#fff',

    background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
    '&:hover': {
      backgroundColor: '#c51a1c !important',

      '@media (hover: none)': {
        backgroundColor: '#c51a1c !important',
      },
    },
    '&:disabled': {
      background: 'linear-gradient(180deg, #952024 0%, rgb(223, 12, 12, 0.5) 100%)',
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
    right: '-10px',
    zIndex: '10',
  },

  tooltipsCenterWrapper: {
    position: 'absolute',
    top: 'calc(50% - 8.5px)',
    right: '20px',
    zIndex: '10',
  },

  tooltip: {
    width: '15px',
    height: '15px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipCenter: {},

  tooltipInfo: {
    marginLeft: '3px',
  },

  btnWrapper: {
    position: 'relative',
    display: 'inline',
  },
}))
