import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 540,
    padding: 10,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.main,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderRadius: 7,
  },

  inputContainer: {
    marginBottom: 0,
  },

  linkPublicationContainer: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  marginBottomDefault: {
    marginBottom: 20,
  },

  button: {
    padding: '0 25px',
  },

  links: {
    marginBottom: 20,
    padding: '0 10px',
    maxHeight: 130,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 7,
    boxShadow: 'inset 0 -4px 13px rgba(135, 135, 135, 0.15)',
  },

  linkWrapper: {
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linkText: {
    width: '95%',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
  },

  linksBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  deleteBtn: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.text.second,
    cursor: 'pointer',
  },

  commentField: {
    height: 'auto',
  },

  dragAndDropWrapper: {
    marginBottom: 20,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
}))
