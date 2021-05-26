import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
    },

    colorPrimary: {
      '&$checked': {
        color: 'rgba(0, 123, 255, 1)',
        '&:hover': {
          backgroundColor: 'rgba(0, 123, 255, 0.04)',
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
      },
    },
  })
