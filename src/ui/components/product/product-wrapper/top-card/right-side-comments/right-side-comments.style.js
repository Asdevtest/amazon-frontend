import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  iconButton: {
    height: '40px',
    width: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: theme.palette.text.second,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      color: theme.palette.text.general,
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  alert: {
    marginBottom: '24px',
  },
  mainCardWrapper: {
    padding: '16px',
    marginBottom: '24px',
  },
  parseButtonsWrapper: {
    display: 'flex',
    marginBottom: '16px',
  },
  buttonParseAmazon: {
    marginRight: '16px',
  },
  productFieldBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  productCheckboxBox: {
    alignItems: 'center',
    display: 'flex',
  },
  typoCheckbox: {
    marginRight: '16px',
  },
  supplierContainer: {
    marginBottom: '20px',
  },
  supplierIcon: {
    marginRight: '16px',
  },
  supplierIconBackground: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },
  tableCellPadding: {
    padding: '16px 24px',
  },
  centerTableCellPadding: {
    padding: '16px 24px',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  rightBoxComments: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },
  heightFieldAuto: {
    height: 'auto',
    width: '100%',

    padding: 0,
    border: 'none',
  },
  buttonsWrapper: {
    position: 'fixed',
    bottom: 50,

    zIndex: 999,
    display: 'grid',
    gridTemplateColumns: 'repeat(3,auto)',
    gap: '10px',
    marginBottom: '20px',
    width: '33%',
  },

  buttonWrapper: {
    position: 'fixed',
    bottom: 50,
    right: 60,
    zIndex: 999,
    marginBottom: '20px',
    width: '33%',
    display: 'grid',
  },

  buttonNormal: {
    flexGrow: 1,
    width: '100%',
  },
  buttonNormalNoMargin: {
    marginRight: 0,
  },
  buttonDelete: {
    flexGrow: 1,

    width: '100%',
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
  errorActive: {
    borderColor: 'red',
  },

  restoreBtn: {
    flexGrow: 1,
    marginLeft: '15px',
  },

  buttonClose: {
    flexGrow: 1,
    width: '100%',
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

  '@keyframes ani': {
    '0%': {transform: 'translateY(-150%)', opacity: 0},
    '100%': {transform: 'translateY(0)', opacity: 1},
  },

  acceptMessageWrapper: {
    position: 'absolute',
    top: 0,
    left: '50%',

    padding: '10px',
    marginTop: '63px',
    zIndex: 999,
    opacity: 0,
    transform: 'translateY(-150%)',
    animation: '$ani 1s forwards',
  },

  acceptMessage: {
    color: '#00B746',
  },
}))
