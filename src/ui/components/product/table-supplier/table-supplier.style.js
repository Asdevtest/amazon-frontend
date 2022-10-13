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
    color: theme.palette.text.general,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    borderRadius: '10px',
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      // color: theme.palette.text.general,
      borderBottom: 'none',
    },
    '& th': {
      // color: theme.palette.text.general,
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

  alignCenterFiles: {
    textAlign: 'center',
    zIndex: 1,
  },
  alignRight: {
    textAlign: 'right',
  },
  rightBoxComments: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  heightFieldAuto: {
    height: 'auto',

    padding: 0,
    border: 'none',
  },
  buttonsWrapper: {
    display: 'flex',
  },
  buttonNormal: {
    flexGrow: 1,
    marginRight: '16px',
  },
  buttonDelete: {
    flexGrow: 1,
  },
  tableRowAcceptedSupplier: {
    // backgroundColor: '#baffba',

    backgroundColor: theme.palette.background.tableCurRow,
  },
  tableRowSelectedSupplier: {
    backgroundColor: 'rgba(245, 0, 87, 0.08)',
  },
  // link: {
  //   width: '250px',
  //   overflowX: 'auto',
  //   whiteSpace: 'nowrap',
  // },

  button: {
    width: '100%',
    display: 'flex',
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'min-content',
  },

  link: {
    fontSize: 12,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    marginLeft: 30,
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  nameCell: {
    minWidth: 200,
  },

  commentCell: {
    minWidth: 250,
  },

  filesWrapper: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  filesCell: {
    width: '360px',
  },
  createdByCell: {
    width: '120px',
    textAlign: 'center',
  },
}))
