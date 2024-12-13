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
    width: '300px',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actionsButtonsContainer: {
    display: 'flex',
    gap: 30,
  },

  error: {
    color: 'red',
  },
}))
