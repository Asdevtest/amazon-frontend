import {createStyles} from '@material-ui/styles'

export const styles = () =>
  createStyles({
    root: {
      border: '1px solid #006CFF',
      borderRadius: 4,
      padding: '10px 17px',

      // display: 'flex',
      // flexDirection: 'column',
    },

    chosenItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      height: 40,

      marginBottom: 10,

      borderBottom: '1px solid #E0E0E0',
    },

    itemsWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
