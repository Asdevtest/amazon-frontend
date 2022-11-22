import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {},
  title: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: 4,
    width: 30,
    height: 30,
    margin: 0,
    textAlign: 'center',

    // color: theme.palette.primary.main,
    fontSize: '18px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      opacity: '.8',
    },
  },

  option: {
    width: 30,
    padding: '6px',
    textAlign: 'center',

    transition: '.3s ease',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 4,
    },
  },

  selectedBtn: {
    // backgroundСolor: 'rgba(25, 118, 210, 0.8)',
    // backgroundColor: 'red',

    color: 'white !important',
  },

  // button: {
  //   '&.Mui-selected, &.Mui-selected:hover': {
  //     color: 'white',
  //     backgroundColor: '#006CFF',
  //   },
  // },

  // buttonsWrapper: {
  //   width: '200px',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   gap: '20px',
  // },
}))
