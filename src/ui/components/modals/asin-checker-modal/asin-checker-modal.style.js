import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
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
    color: '#001029',
  },

  commentLabelText: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '19px',
    color: '#656565',
  },

  heightFieldAuto: {
    height: '141px',
    width: '100%',

    padding: 0,
    border: 'none',
  },

  buttonOk: {
    padding: '8px 36px',
    marginRight: '10px',
  },

  buttonCancel: {
    padding: '8px 36px',
    backgroundColor: '#fff',
    color: '#001029',
    '&:hover': {
      backgroundColor: 'rgba(231, 231, 231, 0.801)',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: 'auto',
    margin: 0,
  },
  searchInput: {
    border: '1px solid #007bff',
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
    color: '#001029',
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
