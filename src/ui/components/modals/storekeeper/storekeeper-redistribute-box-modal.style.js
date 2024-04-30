import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: 'relative',
    paddingRight: 10,
  },
  boxesWrapper: {
    display: 'flex',
    gap: '40px',
  },
  buttonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,

    position: 'sticky',
    bottom: 0,
    right: 0,
    marginRight: 5,
  },

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
  },

  sectionTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
  },

  currentBoxTitle: {
    display: 'flex',
    gap: '23px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: '10px',
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
  },

  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
  },

  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },
}))
