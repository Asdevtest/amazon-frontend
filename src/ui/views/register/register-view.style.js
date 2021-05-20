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
    checkbox: {
      marginLeft: '-12px',
    },
    fullWidth: {
      flexBasis: '100%',
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(2.5),
    },
  })
