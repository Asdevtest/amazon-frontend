import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const boxShadow = '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'

  return {
    root: {
      marginLeft: '3px',
      padding: '10px 15px',
      maxWidth: '265px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      borderRadius: '25px',

      '&:hover': {
        backgroundColor: theme.palette.button.primaryHoverBackground,
        boxShadow,
      },
    },

    activeProduct: {
      boxShadow,
      backgroundColor: theme.palette.background.general,
      '&:hover': {
        backgroundColor: 'unset',
      },
    },

    productTitle: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    productBody: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },

    productImg: {
      marginLeft: '3px',
      borderRadius: '8px',
      width: 50,
      height: 50,
      objectFit: 'contain',
      boxShadow: '0px 2px 8px 0px #1F1F1F40',
    },

    orderText: {
      color: theme.palette.text.second,
      fontSize: '14px',
    },
  }
})
