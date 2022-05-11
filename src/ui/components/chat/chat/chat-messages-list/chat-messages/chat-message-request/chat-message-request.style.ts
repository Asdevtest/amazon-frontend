import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    backgroundColor: '#D9FAE5',
    padding: '15px 14px',
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
  labelValueBlockWrapper: {},
  labelValueBlockWrapperNotFirst: {
    marginLeft: '20px',
  },
}))
