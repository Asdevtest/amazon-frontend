import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  modalTitle: {
    color: 'rgb(61, 81, 112)',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '24px',
  },
  buttonWrapper: {
    padding: '16px',
    textAlign: 'right',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '100%',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  searchInput: {
    border: '1px solid #007bff',
    width: '400px',
    height: 36,
  },

  searchContainer: {
    width: 'auto',
  },

  topHeaderBtnsWrapper: {
    paddingTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
}))
