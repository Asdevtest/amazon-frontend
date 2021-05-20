import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    formFields: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    field: {
      flexBasis: '45%',
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
    },
    fullWidth: {
      flexBasis: '100%',
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2.5),
    },
  })
