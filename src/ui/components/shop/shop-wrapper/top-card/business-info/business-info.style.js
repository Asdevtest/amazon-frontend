import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  businessInfoWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  businessInfoTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
  },

  businessInfoDate: {
    color: '#001029',
  },

  businessInfoDateAgo: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: '#656565',
  },
  assetsListItem: {
    padding: 0,
  },

  assetsListItemText: {
    marginLeft: '22px',
  },

  assetsTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
  },
}))
