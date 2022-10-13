export const styles = theme => ({
  root: {
    color: theme.palette.text.second,
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
