import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      overflow: 'hidden',
      marginBottom: theme.spacing(1),
    },
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

  modalTitle: {
    marginRight: '100px',

    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
      marginRight: 0,
    },
  },
  subTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  methodInput: {
    width: 280,
  },
  tariffInput: {
    width: 210,
  },

  sumField: {
    width: 'min-content',
  },

  shortInput: {
    width: 150,
  },

  pricesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    flexGrow: 1,

    gap: 45,
  },

  imgBox: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  productTitle: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  shippinLabel: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflowX: 'auto',
  },

  imgBlock: {
    display: 'flex',
  },

  imgSubBlock: {
    display: 'flex',
    marginLeft: '10px',
    flexDirection: 'column',
  },

  countBlock: {
    display: 'flex',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 40,
  },

  actionButton: {
    width: '126px',
    height: '40px',
  },

  downloadButton: {
    width: 216,
    height: 40,
    gap: 5,
  },

  superboxTypo: {
    marginLeft: '10px',
    color: theme.palette.primary.main,
    fontSize: '20px',
    fontWeight: '900px',
  },

  amount: {
    marginLeft: '5px',
  },

  row: {
    outline: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(0.99)',
    },
  },

  headerSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  datesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '5px',
    },
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: '20px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: 15,
    },
  },

  storekeeperField: {
    maxWidth: '270px',
    margin: '0',
  },
  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'flex-end',
  },

  imageFileInputWrapper: {
    width: '100%',
    display: 'flex',
    marginTop: '20px',
    alignItems: 'flex-start',
  },

  // filesWrapper: {
  //   width: '450px',
  //   maxHeight: '220px',
  //   overflow: 'auto',
  // },

  filesContainer: {
    width: 'auto',
    marginLeft: '30px',
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

  filesWrapper: {
    marginTop: 20,
    height: 125,
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  textEllipsis: {
    maxWidth: 150,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
    marginBottom: 20,
    [theme.breakpoints.down(768)]: {
      border: '1px solid #007bff',
      width: '280px',
      height: 36,
    },
  },

  searchContainer: {
    width: 'auto',
    justifySelf: 'flex-start',
  },

  searchWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  fieldLabel: {
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '16px',
      color: '#001029',
      fontWeight: 600,
    },
  },
  subFieldLabel: {
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
  },
  filesSubWrapper: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      minWidth: '280px',

      display: 'flex',
      justifyContent: 'center',
    },
  },
  tableWrapper: {
    // height: '600px',
    // minHeight: 400,
    // maxHeight: 600,
    maxHeight: 600,
    overflow: 'auto',
    width: '100%',
  },

  virtualScroller: {
    minHeight: 150,
    maxHeight: 450,
  },
  columnHeaderTitleContainer: {
    flexDirection: 'row !important',
  },
  columnHeaderDraggableContainer: {
    flexDirection: 'row !important',
  },
}))
