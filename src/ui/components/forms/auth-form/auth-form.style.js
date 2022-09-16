import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    // root: {
    //   padding: '0 40px',
    // },
    formFields: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    field: {
      flexBasis: '100%',
      position: 'relative',
    },
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      marginLeft: '-12px',
    },
    label: {
      fontWeight: 600,
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2.5),
    },
    forgotPassword: {
      marginLeft: '20px',
      transition: '0.3s ease',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
      '&:hover': {
        color: '#007bff',
        fontWeight: '500',
      },
    },

    visibilityIcon: {
      position: 'absolute',
      right: 10,
      top: 41,
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    },

    inputAdornment: {
      position: 'absolute',
      left: 0,
    },

    input: {
      height: '34px',
    },
  })
