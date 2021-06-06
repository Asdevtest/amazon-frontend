import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  multiline: {
    height: 'auto',
    width: '100%',
  },
  field: {
    marginTop: theme.spacing(2.5),
  },
  titleWrapper: {
    marginBottom: theme.spacing(5),
  },
  placeRequestBtnWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tableWrapper: {
    marginTop: '15px',
  },
}))
