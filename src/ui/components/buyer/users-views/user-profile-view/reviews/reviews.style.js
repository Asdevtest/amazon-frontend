import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '32px',
    fontWeight: 500,
  },
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
  },
  tabContent: {
    minHeight: '120px',
  },
  tabsHeadContainer: {
    borderBottom: '1px solid rgb(217, 222, 229)',
  },
  tabsIndicator: {
    backgroundColor: 'rgb(0, 123, 255)',
  },
  tableHeadTypography: {
    color: 'rgb(61, 81, 112)',
    fontWeight: 500,
  },
  mainTitle: {
    marginTop: '48px',
  },
  subTabWrapper: {
    height: '98px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typoNoReviews: {
    textAlign: 'center',
  },
  selected: {
    color: 'rgb(0, 123, 255)',
    textTransform: 'none',
  },
}))
