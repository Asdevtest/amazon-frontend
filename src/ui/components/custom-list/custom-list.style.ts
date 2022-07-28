import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  listItem: {
    padding: 0,
  },

  listItemText: {
    marginLeft: '22px',
  },

  listTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: '#001029',
  },

  dot: {
    width: '10px',
    color: '#006CFF',
  },
}))
