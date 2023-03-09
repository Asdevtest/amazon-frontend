import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
    position: 'relative',
  },

  input: {
    // border: `1px solid ${theme.palette.primary.main}`,
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
    position: 'relative',
  },

  searchContainer: {
    width: 'auto',
    // justifySelf: 'flex-start',
    margin: 0,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  closeIcon: {
    color: theme.palette.text.second,
    cursor: 'pointer',
    transition: '.3s ease',

    '&: hover': {
      transform: 'scale(1.1)',
    },
  },

  searchWrapper: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
  },

  submit: {
    // position: 'absolute',
    // border: `1px solid ${theme.palette.primary.main}`,

    border: `1px solid ${theme.palette.primary.main}`,

    borderLeft: 'none',
    height: 40,
    padding: '6px',
    // right: -1,
    // top: -18,
    flexGrow: 1,
  },
}))
