import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconButton: {
    padding: '8px',
  },
  icon: {
    fontSize: '16px',
    color: theme.palette.primary.main,
    '& > *:first-of-type': {
      fontSize: '16px',
    },
  },

  search: {
    fontSize: '14px',
  },
  searchAdornment: {
    marginRight: '-8px',
  },

  filter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: '1 1 100%',
    marginLeft: theme.spacing(4),
  },
  filterTitle: {
    fontSize: '14px',
  },

  selectTitle: {
    whiteSpace: 'nowrap',
    fontSize: '14px',
    lineHeight: '21px',
    marginRight: '16px',
  },
  selectRoot: {
    width: '54px',
    height: '24px',
    borderRadius: '4px',
    fontSize: '12px',
  },
}))
