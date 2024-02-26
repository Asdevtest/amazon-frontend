import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  datagridWrapper: {
    marginTop: '20px',
    height: '75vh',
    width: '100%',
  },

  clickableCell: {
    transition: '.3s ease',

    '&:hover': {
      borderRadius: 10,
      boxShadow: 'inset 0 0 10px rgba(247, 179, 7, .8)',
      transform: 'scale(0.98)',
    },
  },

  ideaRowGreen: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldGreen,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  ideaRowYellow: {
    '&:before': {
      content: '""',
      backgroundImage: theme.palette.other.ideaProductSheldYellow,

      width: 48,
      height: 21,
      posotion: 'absolute',
      top: 0,
      left: 0,
      marginRight: '-48px',
    },
  },

  modalDialogContext: {
    padding: 0,
  },
}))
