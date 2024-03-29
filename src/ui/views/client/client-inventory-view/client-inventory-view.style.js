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

  modalDialogContext: {
    padding: 0,
  },
}))
