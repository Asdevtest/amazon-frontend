import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalFieldsWrapper: {
    display: 'flex',
    gap: '30px',
  },
  modalMessageWrapper: {
    width: '596px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '30px',
  },

  modalMessageTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  buttonOk: {
    padding: '8px 36px',
    marginRight: '10px',
  },

  buttonCancel: {
    padding: '8px 36px',
    backgroundColor: theme.palette.background.general,
    color: theme.palette.text.general,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
  },
  tableSearchWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  tableSearchTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },
  commentContainer: {
    margin: 0,
  },

  buttonPreview: {
    padding: '8px 36px',
  },

  error: {
    color: 'red',
  },
}))
