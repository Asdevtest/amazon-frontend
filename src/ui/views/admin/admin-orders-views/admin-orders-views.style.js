import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  buttonWrapper: {
    padding: '16px',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '24px',
    width: '100%',
  },
  buttonsWrapper: {
    '& button': {
      marginRight: theme.spacing(2),
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },
}))
