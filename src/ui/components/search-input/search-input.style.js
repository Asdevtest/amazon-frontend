import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  searchInput: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  input: {
    border: '1px solid #007bff',
    width: '300px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
    // justifySelf: 'flex-start',
    margin: 0,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  submit: {
    padding: '6px',
  },
}))
