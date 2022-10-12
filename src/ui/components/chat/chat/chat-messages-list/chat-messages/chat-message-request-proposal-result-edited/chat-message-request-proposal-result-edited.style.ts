import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.main,
    padding: '40px 30px',
    width: '869px',
    margin: '0 auto',
    border: '1px solid #4CAF50',
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
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase',
  },
  timeWrapper: {
    marginLeft: '20px',
  },
  timeText: {
    color: '#5F5F5F',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
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
    fontSize: 18,
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
    backgroundColor: theme.palette.background.main,
    borderRadius: '4px',
    marginTop: 15,
    textAlign: 'end',
  },
  timeToCheckBlockValueText: {
    fontSize: '15px',
    color: '#5F5F5F',
  },
  footerWrapper: {
    marginTop: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
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
    flex: 1,
    display: 'flex',
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
}))
