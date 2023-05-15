import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px 30px 30px',
    width: 1100,
    margin: '0 auto',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    // '& p, h1, h2, h3, h4, h5, span': {
    //   margin: 0,
    // },
  },
  headerAndTimeWrapper: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerWrapper: {},
  headerText: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  timeWrapper: {
    marginLeft: '20px',
  },
  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',

    position: 'absolute',
    top: 0,
    right: 20,
  },
  mainInfoWrapper: {
    width: '100%',
    marginTop: 20,
  },
  titleWrapper: {},
  titleText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  descriptionWrapper: {
    marginTop: 18,
  },
  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 100,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    width: '50%',
  },
  resultWrapper: {
    width: '100%',
    marginTop: 25,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultLeftSide: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  resultTextWrapper: {},
  resultText: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '140%',
    color: theme.palette.text.general,
    whiteSpace: 'pre',
  },
  resultLinksWrapper: {
    marginTop: 20,
  },
  linkWrapper: {
    padding: '10px 0',
  },
  resultRightSide: {},
  timeToCheckBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  timeToCheckBlockLabelText: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },
  timeToCheckBlockValueWrapper: {
    width: '158px',
    padding: '8px 16px 7px 56px',
    backgroundColor: theme.palette.background.general,
    borderRadius: '4px',
    marginTop: 15,
    textAlign: 'end',
  },
  timeToCheckBlockValueText: {
    fontSize: '15px',
    color: theme.palette.text.second,
  },
  footerWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
    // gap: 20,
  },

  btnEditWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
  },

  actionBtnWrapperStyle: {
    // flex: 1,
    // display: 'flex',
  },
  actionBtnWrapperStyleNotFirst: {
    marginLeft: '42px',
  },
  actionButton: {
    // flex: 1,
    // display: 'flex',

    padding: '0 15px',
  },

  editButton: {
    width: '252px',
  },

  successBtn: {
    width: '197px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  // image: {
  //   marginLeft: '20px',
  //   width: '80px',
  //   height: '70px',
  //   objectFit: 'contain',
  //   objectPosition: 'center',
  //   transition: '.2s ease',
  //   cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  //   '&:hover': {
  //     transform: 'scale(1.02)',
  //   },
  // },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    transition: '.3s ease',
    // cursor: 'pointer',
    // '&: hover': {
    //   transform: 'scale(1.05)',
    // },
  },

  // imageWrapper: {
  //   display: 'flex',
  //   alignItems: 'flex-end',
  // },

  filesWrapper: {
    display: 'flex',
    maxWidth: '400px',
  },

  imagesAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
  },

  photoTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
  },
  carouselWrapper: {
    marginTop: '10px',
  },
  documentsWrapper: {},
  documentsTitle: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
  },
  documentWrapper: {
    marginTop: '10px',
  },
  documentTitle: {},
  emptyDocumentIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
  },
  documentEmpty: {},

  mainWrapper: {
    // display: 'flex',
    // gap: 20,
    width: '100%',
    position: 'relative',
  },

  infosSubWrapper: {
    display: 'flex',

    width: '50%',
    // width: 'max-content',
  },

  divider: {
    height: 'auto',

    // borderColor: theme.palette.background.border,
  },

  labelValueBlockWrapper: {
    width: 230,
    // marginBottom: 24,
  },

  priceAmazonWrapper: {
    display: 'flex',
  },

  redText: {
    color: '#FB1D5B',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },

  cashBackPrice: {
    marginLeft: 5,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: '#656565',
    textDecorationLine: 'line-through',
    whiteSpace: 'nowrap',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  infosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  // infosWrapper: {
  //   // width: 'max-content',
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   gap: 20,

  //   // display: 'grid',
  //   // gridTemplateColumns: 'repeat(2, 1fr)',
  //   // width: '100%',
  //   // gridAutoColumns: 'max-content',
  //   // grid: 'auto-flow',

  //   minHeight: 120,
  // },

  infosProposalWrapper: {
    display: 'flex',
    // flexWrap: 'wrap',
    gap: 20,

    minHeight: 120,
  },

  // fieldLabel: {
  //   fontSize: 14,
  //   color: theme.palette.text.second,
  // },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  infoItemWrapper: {
    background: theme.palette.background.disabled,
    width: 310,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  infoLinksItemWrapper: {
    background: theme.palette.background.disabled,
    width: 515,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  infoItemText: {
    color: theme.palette.text.general,
  },

  infoLinkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // maxWidth: 450,
    // color: theme.palette.primary.main,
    color: '#006CFF',
  },

  fieldContainer: {
    width: 'min-content !important',

    '&: last-of-type': {
      marginBottom: '0 !important',
    },
  },

  rightInfosSubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 40,
  },

  timeInfoItemWrapper: {
    width: 167,
    background: theme.palette.background.green,
  },

  infoItemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxHeight: 170,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  linkInfoItemList: {
    width: 525,
  },

  amazonOrder: {
    display: 'flex',
    alignItems: 'center',
  },
  amazonOrderText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    // border: '1px solid red',
    height: 'min-content',
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: theme.palette.input.customDisabled,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    // transition: '.3s ease',

    // cursor: 'pointer',
    // '&: hover': {
    //   transform: 'scale(1.05)',
    // },
  },

  mainImageWrapper: {
    position: 'relative',

    padding: 3,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23007BFFFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='90' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 99,
  },

  imageListItem: {
    width: '100%',
    height: '100%',
  },

  imagesWrapper: {
    display: 'flex',
    gap: 15,
  },

  moreImagesWrapper: {
    background: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },

  moreImagesText: {
    fontSize: 36,
    color: '#fff',
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  simpleSpan: {
    fontWeight: 600,
    fontSize: 14,
    whiteSpace: 'nowrap',
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  footerSubWrapper: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    gap: 50,
    // width: '100%',
  },
}))
