import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    // backgroundColor: '#D9FAE5',
    backgroundColor: '#fff',
    padding: '15px 14px',
    // width: '672px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
    width: '100%',
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
  timeWrapper: {},
  timeText: {
    color: '#5F5F5F',
    fontSize: 18,
  },
  mainInfoWrapper: {
    marginTop: 16,
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
    '&:not(:first-of-type)': {
      marginTop: '20px',
    },
  },
  footerRowNotFirst: {
    marginTop: 20,
  },
  labelValueBlockWrapper: {
    backgroundColor: '#D9FAE5',
  },
  labelValueBlockWrapperNotFirst: {
    marginLeft: '20px',
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
    maxWidth: '300px',
  },
}))
