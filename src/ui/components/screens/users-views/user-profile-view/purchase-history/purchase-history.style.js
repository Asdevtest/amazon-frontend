import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: theme.palette.text.general,
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
    color: theme.palette.text.general,
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
  typoNoHistory: {
    textAlign: 'center',
  },
  selected: {
    color: 'rgb(0, 123, 255)',
    textTransform: 'none',
  },
}))
