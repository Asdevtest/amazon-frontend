import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '800px',
  },

  title: {
    color: theme.palette.text.general,
  },

  mainTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '33px',
    color: 'black',
  },

  tableWrapper: {
    marginTop: '10px',
    height: '30vh',
  },

  chosenGoodsTitle: {
    margin: '24px 0 4px',

    color: theme.palette.text.general,
  },

  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  // searchInput: {
  //   width: '270px',
  //   height: '30px',
  //   borderRadius: '22px',
  //   border: '.5px solid #000000',
  // },
  // searchInputWrapper: {
  //   display: 'flex',
  // },

  searchBtn: {
    marginLeft: '14px',
    padding: '0 25px',
    height: '30px',
    border: '1px solid #006CFF',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease-in-out',

    backgroundColor: 'white',
    color: theme.palette.primary.main,
    '&:hover': {
      opacity: '0.5',
    },
    '&:disabled': {
      backgroundColor: 'white',
      color: 'black',
      cursor: 'default',
      opacity: '0.5',
    },
  },

  searchBtnText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.primary.main,
  },

  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 13px',
  },

  // chip: {
  //   color: '#000',
  //   backgroundColor: 'white',
  //   border: '.5px solid #000000',
  //   fontSize: '14px',
  //   transition: '.4s ease-in-out',
  //   '&:hover, &:focus': {
  //     transform: 'scale(1.01)',
  //   },
  // },
  // chipActive: {
  //   color: '#fff',
  //   backgroundColor: '#006CFF',
  //   '&:hover, &:focus': {
  //     transform: 'scale(1.01)',
  //     backgroundColor: '#006CFF',
  //   },
  // },

  betweenChipsText: {
    margin: '0 17px',
    minWidth: 100,

    color: theme.palette.text.second,
  },

  asinChip: {
    marginLeft: '8px',
  },

  chipLeftMargin: {
    marginLeft: '10px',
  },

  chip: {
    marginBottom: 5,
    color: theme.palette.text.general,
    fontSize: '16px',
    // backgroundColor: '#F4F4F4',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  chipActive: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    color: theme.palette.primary.main,

    borderBottom: '5px solid #0460DE',
  },

  searchInput: {
    // border: '1px solid #007bff',
    // backgroundColor: '#F4F4F4',
    flexGrow: 1,
    height: 40,
    '&:focus-within': {
      backgroundColor: theme.palette.background.main,
    },
  },
}))
