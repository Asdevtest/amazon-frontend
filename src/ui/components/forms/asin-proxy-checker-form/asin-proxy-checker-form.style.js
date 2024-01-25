import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '596px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '30px',
  },

  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  modalMessageTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  modalFieldsWrapper: {
    display: 'flex',
    gap: '30px',
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',
    padding: 0,
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  commentContainer: {
    margin: 0,
  },

  tableSearchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tableSearchTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    padding: '10px 25px',
  },

  actionsButtonsContainer: {
    display: 'flex',
    gap: 30,
  },

  buttonCancel: {
    padding: '10px 25px',
    color: theme.palette.text.general,
    background: theme.palette.background.general,
  },

  error: {
    color: 'red',
  },
}))
