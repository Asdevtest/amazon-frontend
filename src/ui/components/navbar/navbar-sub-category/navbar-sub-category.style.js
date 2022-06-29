import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      height: '50px',
      paddingLeft: '20px',
      fontSize: '0.8rem',
      fontWeight: 400,
      color: theme.palette.text.secondary,
      '&$selected': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
      },
      '&$selected:hover': {},
      '&:hover': {},
    },
    selected: {},
  })
