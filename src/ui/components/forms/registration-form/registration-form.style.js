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
    checkbox: {
      marginLeft: '-12px',
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: theme.spacing(2.5),
    },
  })
