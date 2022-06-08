import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    backgroundColor: '#D9FAE5',
    padding: '40px 30px',
    width: '869px',
    margin: '0 auto',
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
    color: '#001029',
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
    color: '#354256',
    fontSize: 18,
  },
  descriptionWrapper: {
    marginTop: 18,
  },
  descriptionText: {
    color: '#354256',
    fontSize: 18,
  },
  resultWrapper: {
    marginTop: 25,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
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
    color: '#001029',
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
    color: '#001029',
  },
  timeToCheckBlockValueWrapper: {
    width: '146px',
    padding: '8px 16px 7px 56px',
    backgroundColor: '#fff',
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
    justifyContent: 'space-between',
    marginTop: '48px',
  },
  actionBtnWrapperStyle: {
    flex: 1,
    display: 'flex',
  },
  actionBtnWrapperStyleNotFirst: {
    marginLeft: '50px',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
  },

  successBtn: {
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
    cursor: 'pointer',
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
