import {createStyles} from '@material-ui/core'

export const styles = createStyles({
  cardWidthTest: {
    width: '200px',
  },
  mainTitle: {
    marginTop: '24px',
  },
  addProductBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
  },

  btnsWrapper: {
    display: 'flex',

    '& > :not(:first-child)': {
      marginLeft: '30px',
    },
  },

  archiveBtnsWrapper: {
    display: 'flex',

    '& > :first-child': {
      marginRight: '30px',
    },
  },

  archiveAddBtn: {
    border: '1px solid #FF1616',
    color: '#FF1616',

    '&:hover': {
      border: '1px solid #FF1616',
      opacity: 0.6,
    },
  },

  archiveRecoverBtn: {
    border: '1px solid #009a07',
    color: '#009a07',

    '&:hover': {
      border: '1px solid #009a07',
      opacity: 0.6,
    },
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  archiveIcon: {
    marginLeft: '10px',
  },

  openArchiveBtn: {
    padding: '0 30px 0 30px',
  },
})
