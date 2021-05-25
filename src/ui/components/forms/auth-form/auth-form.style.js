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
    },
    formFooter: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2.5),
    },
  })
