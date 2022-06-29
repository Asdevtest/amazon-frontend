import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '21px',
    marginBottom: '10px',
  },
  modalWrapper: {
    minWidth: '800px',
  },
  paper: {
    border: '1px solid #C8CED3',
    padding: '8px 16px',
    height: 'max-content',
    width: '100%',
  },
  divider: {
    margin: '10px -16px 10px',
  },
  buttonsBox: {
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
  },
  saveBtn: {},
  tableWrapper: {
    marginTop: '15px',
  },
  noBoxesText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },

  hidden: {
    display: 'none',
  },

  label: {
    fontSize: '18px',
  },

  addBtn: {
    display: 'flex',
  },

  fieldLabel: {
    margin: 0,
  },
  cancelBtn: {
    color: '#fff',
    backgroundColor: '#ff0000',
    '&:hover': {
      backgroundColor: '#c51a1c',

      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },
}))
