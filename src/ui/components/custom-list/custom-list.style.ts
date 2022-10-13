import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: theme.palette.primary.main,
  },
}))
