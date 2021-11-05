import {createStyles} from '@material-ui/styles'

export const styles = theme =>
  createStyles({
    root: {
      maxWidth: '700px',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(2.5),
    },
    field: {
      flexBasis: '100%',
    },
    rangeField: {
      flexBasis: '100%',
      minWidth: '240px',
      maxWidth: '270px',
    },
    multiline: {
      height: 'auto',
      width: '100%',
    },
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '-12px',
    },
  })
