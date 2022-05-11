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
  timeWrapper: {
    marginLeft: '20px',
  },
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
    color: '#354256',
  },
  resultLinksWrapper: {
    marginTop: 20,
  },
  linkWrapper: {
    padding: '10px 0',
  },
  resultRightSide: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timeToCheckBlockWrapper: {},
  timeToCheckBlockLabelText: {
    fontSize: '15px',
    color: '#5F5F5F',
  },
  timeToCheckBlockValueWrapper: {
    padding: '8px 25px 6px 56px',
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    marginTop: 15,
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
  cancelBtn: {
    backgroundColor: '#F44336',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#F44336',
    },
  },
  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },
}))
