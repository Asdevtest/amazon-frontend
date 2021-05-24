import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      height: '50px',
      fontWeight: 500,
      color: theme.palette.text.primary,
      borderLeft: `5px solid transparent`,
      paddingRight: '16px',

      '&$selected': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: 'transparent',
      },
      '&$selected:hover': {
        borderLeft: `5px solid ${theme.palette.primary.main}`,
      },
      '&:hover': {},
    },
    selected: {},
  })
