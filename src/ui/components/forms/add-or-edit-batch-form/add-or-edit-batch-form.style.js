import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '1360px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  modalTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '22px',
      color: theme.palette.text.general,
    },
  },

  subTitle: {
    color: theme.palette.text.general,
  },

  boxCounterWrapper: {
    padding: '8px 11px',
    height: '52px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center',

    position: 'absolute',
    top: 0,
    right: 0,

    borderTop: 'none !important',
    [theme.breakpoints.down(768)]: {
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(3)': {
        display: 'none',
      },
      '& > :nth-of-type(2) > :nth-of-type(1) > :nth-of-type(5)': {
        marginLeft: '2px',
      },
    },
  },

  boxCounterText: {
    color: theme.palette.text.second,
  },

  boxCounterCount: {
    fontWeight: 600,
    marginLeft: 5,
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
    height: 450,
    overflow: 'auto',
  },

  chosenGoodsTitle: {
    // margin: '24px 0 4px',
    color: theme.palette.text.general,
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
  },

  cancelBtn: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      width: '120px',
    },
  },

  // searchInput: {
  //   width: '270px',
  //   height: '30px',
  //   borderRadius: '22px',
  //   border: '.5px solid #000000',
  // },
  searchInputWrapper: {
    display: 'flex',
  },

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
    margin: '20px 0 13px',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  chip: {
    color: '#000',
    backgroundColor: 'white',
    border: '.5px solid #000000',
    fontSize: '14px',
    transition: '.4s ease-in-out',
    '&:hover, &:focus': {
      transform: 'scale(1.01)',
    },
  },
  chipActive: {
    color: '#fff',
    backgroundColor: '#006CFF',
    '&:hover, &:focus': {
      transform: 'scale(1.01)',
      backgroundColor: '#006CFF',
    },
  },

  betweenChipsText: {
    margin: '0 17px',
  },

  asinChip: {
    marginLeft: '8px',
  },

  addBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '15px 0 10px',
  },

  filterField: {
    width: 200,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  sumField: {
    width: '230px',
    margin: 0,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '720px',
    gap: 10,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '10px',
      width: '280px',
      marginBottom: '15px',
    },
  },

  filesContainer: {
    marginTop: '20px',
    width: 'auto',
    marginRight: '50px',
  },

  filesWrapper: {
    width: '450px',
    overflow: 'auto',
    [theme.breakpoints.down(768)]: {
      overflow: 'hidden',
      margin: 0,
    },
  },

  linkText: {
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'auto',

    '&:hover': {
      opacity: '0.8',
    },
  },

  actionBtn: {
    width: '144px',
    height: '40px',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    margin: '25px 0 30px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'end',
      margin: '25px 0 30px',
    },
  },

  uploadFilesWrapper: {
    width: '690px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },
  imageFileInputWrapper: {
    display: 'flex',
    gap: '60px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      flexDirection: 'column',
      gap: '40px',
    },
  },
  photoAndFilesWrapper: {
    height: '200px',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  searchContainer: {
    width: 'auto',
    justifySelf: 'flex-start',
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },

  tableSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: 24,
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'end',
      marginTop: '15px',
      marginBottom: 24,
    },
  },

  weigthCalcWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  volumeWeightDivider: {
    margin: '0 40px',
    color: theme.palette.text.second,
  },

  imageAndFileInputWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '280px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
}))
