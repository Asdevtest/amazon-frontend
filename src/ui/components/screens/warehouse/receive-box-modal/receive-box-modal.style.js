import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    width: '1779px',
  },

  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: '#001029',
    marginBottom: '27px',
  },

  modalHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    // overflow: 'auto',
  },

  currentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  currentBoxesWrapper: {
    width: 350,
  },

  currentBoxFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },
  divider: {
    margin: '-20px 10px',
  },
  img: {
    width: '70px',
    height: '70px',
    marginRight: '20px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleOfCurBox: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '218px',
    color: '#001029',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },

  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '90px',
    height: '30px',
  },
  input: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '2px',
  },
  row: {
    minWidth: '300px',
    outline: '1px solid rgba(143, 152, 165, 0.5)',
  },

  tableWrapper: {
    minWidth: '1275px',
    height: '575px',
    overflow: 'auto',
  },

  sizesCell: {
    minWidth: '140px',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  standartCell: {
    width: '100px',
  },
  headerCell: {
    maxWidth: '100px',
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
  },

  sizeWrapper: {
    display: 'flex',
    gap: '5px',
  },
  descriptionWrapper: {
    display: 'flex',
  },
  qtyWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyTitle: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#656565',
  },
  qtySubTitle: {
    fontWeight: 600,
    color: '#001029',
  },
  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
  },
  qtyCell: {
    minWidth: '80px',
  },
  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
  },

  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',

    marginTop: '10px',
    height: '220px',
  },

  categoryTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#001029',
    fontWeight: '600',
    marginBottom: '15px',
  },
  icon: {
    marginLeft: '16px',
  },
  addButton: {
    width: '216px',
    height: '40px',
    display: 'flex',
  },
  button: {
    width: '162px',
    height: '40px',
  },
  tableWrapperMobile: {
    display: 'none',
  },
  addButtonWrapperMobile: {
    display: 'none',
  },
  checkboxContainer: {
    width: '190px',
    margin: 0,
  },
  label: {
    maxWidth: '150px',
    fontSize: '14px',
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    color: '#656565',
  },
  checkboxCell: {
    width: '200px',
  },
  '@media (max-width: 768px)': {
    root: {
      width: '300px',
    },

    modalTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
      color: '#001029',
      marginBottom: '27px',
    },
    boxesWrapper: {
      width: '300px',
      // marginLeft: '-10px',
      // marginRight: '-20px',
      flexDirection: 'column',

      padding: '20px',
      // overflow: 'auto',
    },
    tableWrapper: {
      display: 'none',
    },
    divider: {
      display: 'none',
    },
    tableRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tableWrapperMobile: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    addButtonWrapper: {
      display: 'none',
    },
    sectionTitle: {
      marginTop: '40px',
      marginBottom: '40px',
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
    },
    deleteBtn: {
      color: '#001029',
    },
    boxesTitle: {
      fontSize: '12px',
      lineHeight: '140%',
      fontWeight: 600,
      color: '#001029',
      textTransform: 'uppercase',
    },
    boxesTitleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boxTitle: {
      fontSize: '12px',
      lineHeight: '16px',
      color: '#656565',
      marginBottom: '12px',
    },
    img: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },

    title: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      // marginRight: '10px',
      width: '200px',
      overflow: 'visible',
      textOverflow: 'inherit',
      whiteSpace: 'pre-wrap',
    },
    boxTitleMobile: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
      color: '#001029',
    },
    inputWrapper: {
      border: '1px solid rgba(143, 152, 165, 1)',
      borderRadius: '4px',
      maxWidth: '45px',
      height: '30px',
    },
    sizeTitle: {
      fontSize: '12px',
      lineHeight: '16px',
      color: '#656565',
    },
    sizeWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '1px',
    },
    photoBtnWrapper: {
      display: 'flex',
      justifyContent: 'end',
    },
    addButtonWrapperMobile: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    buttonsWrapper: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    button: {
      width: '121px',
    },
    cancelButton: {
      color: '#001029',
    },
  },
}))
