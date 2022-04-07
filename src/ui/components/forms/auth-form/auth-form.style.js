import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {},
    formFields: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    field: {
      flexBasis: '100%',
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
      cursor: 'pointer',
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
      cursor: 'pointer',
      '&:hover': {
        color: '#007bff',
        fontWeight: '500',
      },
    },
  })
