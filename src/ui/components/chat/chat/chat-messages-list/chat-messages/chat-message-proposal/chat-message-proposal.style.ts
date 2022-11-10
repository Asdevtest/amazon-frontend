import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px',
    width: '870px',
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
    color: theme.palette.text.general,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
  },
  timeWrapper: {width: '50px'},
  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
  },
  mainInfoWrapper: {
    // width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleWrapper: {},
  titleText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  descriptionWrapper: {
    marginTop: 15,
    marginBottom: 47,
  },
  descriptionText: {
    width: '305px',
    color: theme.palette.text.second,
    fontSize: 18,
  },
  footerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    // alignItems: 'flex-end',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelValueBlockWrapper: {
    width: '100%',
  },
  labelValueBlockWrapperNotFirst: {},
  actionButton: {
    marginLeft: '50px',
    minWidth: '197px',
  },
  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
  cancelBtn: {
    backgroundColor: '#F44336',
    color: '#fff',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
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
    maxWidth: '300px',
  },

  imagesAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
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
    width: '100%',
    gap: '50px',
  },

  rightSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
  },
}))
