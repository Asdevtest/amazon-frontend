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
    // padding: '10px',
    marginBottom: '30px',
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

  // '@keyframes cursor': {
  //   '0%': {cursor: 'url(/assets/icons/Cursor.svg), auto'},
  //   '25%': {cursor: 'url(/assets/icons/Cursor4.svg), auto'},
  //   '50%': {cursor: 'url(/assets/icons/Cursor.svg), auto'},
  //   '75%': {cursor: 'url(/assets/icons/Cursor4.svg), auto'},
  //   '100%': {cursor: 'url(/assets/icons/Cursor.svg), auto'},
  // },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    // animation: '$cursor .9s ease-in-out infinite ',
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

  button: {
    marginBottom: 5,
    marginRight: '10px',
  },

  selectedShopsBtn: {
    marginBottom: 0,
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
  },

  shopsFiltersWrapper: {
    marginBottom: '30px',
    display: 'flex',
  },
})
