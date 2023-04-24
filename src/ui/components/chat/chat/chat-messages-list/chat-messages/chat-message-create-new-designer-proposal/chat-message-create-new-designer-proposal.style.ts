import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px',
    width: 1200,
    margin: '0 auto',
    // border: '1px solid #4CAF50',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
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
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
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
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
    gap: 40,
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

  image: {
    marginLeft: '20px',
    width: '80px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  filesWrapper: {
    display: 'flex',
    maxWidth: '400px',
  },

  imagesAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
  },

  imagesWrapper: {},
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
    display: 'flex',
    gap: 20,
    position: 'relative',
  },

  mainSubWrapper: {
    minWidth: 250,
    maxWidth: '50%',
    // width: 'max-content',
  },

  divider: {
    height: 'auto',

    // borderColor: theme.palette.background.border,
  },

  labelValueBlockWrapper: {
    minWidth: 260,
    maxWidth: 'max-content',

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
    textDecorationLine: 'line-through',
    marginLeft: '5px !important',
  },

  cashBackPrice: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  infosWrapper: {
    // width: 'max-content',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,

    // display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
    // width: '100%',
    // gridAutoColumns: 'max-content',
    // grid: 'auto-flow',

    minHeight: 120,
  },

  infosProposalWrapper: {
    display: 'flex',
    // flexWrap: 'wrap',
    gap: 20,

    minHeight: 120,
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  massageHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  idWrapper: {
    display: 'flex',
    gap: 5,
  },

  idTitle: {
    color: theme.palette.text.general,
  },
  idText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },

  blackText: {
    color: '#001029',
  },

  paragraphWrapper: {
    minHeight: 180,
    marginTop: 20,
    marginBottom: 10,
  },
}))
