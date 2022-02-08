import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  titleWrapepr: {
    marginBottom: theme.spacing(5),
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  modalMessage: {
    maxWidth: '400px',
  },
  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    marginLeft: '10px',
  },
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
  },
}))
