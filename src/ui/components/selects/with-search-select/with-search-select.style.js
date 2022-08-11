import {createStyles} from '@material-ui/styles'

export const styles = () =>
  createStyles({
    root: {
      width: 360,
      height: 36,
      position: 'relative',
    },

    mainWrapper: {
      zIndex: 99,
      width: '100%',

      border: '1px solid #006CFF',
      borderRadius: 4,
      // padding: '0 17px 10px',

      transition: '0.3s ease',
      maxHeight: 36,
      overflow: 'hidden',
      position: 'absolute',
    },

    selectorIsOpen: {
      backgroundColor: '#fff',
      maxHeight: 600,
    },

    chosenItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      height: 36,

      marginBottom: 10,

      borderBottom: '1px solid #E0E0E0',

      padding: '0 17px',

      cursor: 'pointer',
      transition: '0.3s ease',

      '&:hover': {
        transform: 'scale(1.01)',
        backgroundColor: '#F4F4F4',
      },
    },

    subMainWrapper: {
      padding: '0 17px 10px',
    },

    itemsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 500,
      overflow: 'auto',
    },

    button: {
      marginBottom: 5,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',

      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    selectedItemName: {
      width: '90%',
      color: '#007bff',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  })
