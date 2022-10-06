import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    // backgroundColor: '#D9FAE5',
    backgroundColor: '#fff',
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
    color: '#354256',
    fontSize: 18,
    fontWeight: 600,
  },
  timeWrapper: {
    width: '50px',
  },
  timeText: {
    color: '#656565',
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
  },
  mainInfoWrapper: {
    marginTop: 16,
    display: 'flex',
    gap: '50px',
    alignItems: 'start',
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
  footerWrapper: {
    marginTop: 25,
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > :nth-child(2n)': {
      width: '40%',
    },
  },
  footerRowNotFirst: {
    marginTop: 20,
  },
  labelValueBlockWrapper: {
    backgroundColor: '#D9FAE5',
    width: '28%',
  },
  labelValueBlockWrapperNotFirst: {},

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
    width: '40%',
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
  conditionsField: {
    border: 'none',
    resize: 'none',
    color: '#354256',
    fontSize: 18,
    fontFamily: 'inherit',
    width: '305px',
    outline: 'none',
    backgroundColor: 'inherit',
  },
}))
