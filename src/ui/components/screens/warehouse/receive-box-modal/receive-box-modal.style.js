import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 'min-content',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
    marginBottom: '27px',
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
      color: theme.palette.text.general,
      marginBottom: '27px',
    },
  },

  modalHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  footerTitle: {
    color: theme.palette.text.general,
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
      padding: '20px',
    },
  },

  currentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  currentBoxesWrapper: {
    width: 350,
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  img: {
    width: '70px',
    height: '70px',
    marginRight: '20px',
    objectFit: 'contain',
    objectPosition: 'center',
    [theme.breakpoints.down(768)]: {
      // width: '50px',
      // height: '50px',
      marginRight: '10px',
    },
  },
  sectionTitle: {
    color: theme.palette.text.second,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down(768)]: {
      marginTop: '40px',
      marginBottom: '40px',
      fontSize: '16px',
      lineHeight: '22px',
      color: theme.palette.text.general,
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      overflow: 'visible',
      textOverflow: 'inherit',
      whiteSpace: 'pre-wrap',
    },
  },
  titleOfCurBox: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '218px',
    color: theme.palette.text.general,
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
  },

  inputWrapper: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '4px',
    maxWidth: '90px',
    height: '30px',
    [theme.breakpoints.down(768)]: {
      border: '1px solid rgba(143, 152, 165, 1)',
      borderRadius: '4px',
      maxWidth: '45px',
      height: '30px',
    },
  },

  error: {
    border: '1px solid red',
    [theme.breakpoints.down(768)]: {
      border: '1px solid red',
    },
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
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
    height: '100%',
  },
  headerCell: {
    maxWidth: '100px',
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  sizeWrapper: {
    display: 'flex',
    gap: '5px',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      gap: '1px',
    },
  },
  descriptionWrapper: {
    display: 'flex',
    marginBottom: 5,
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
    color: theme.palette.text.second,
  },
  qtySubTitle: {
    fontWeight: 600,
    color: theme.palette.text.general,
  },
  buttonsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'end',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
  },
  qtyCell: {
    minWidth: '80px',
  },
  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
    },
  },

  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',

    overflow: 'hidden',

    marginTop: '10px',
    height: '220px',
  },

  categoryTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.text.general,
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
    [theme.breakpoints.down(768)]: {
      width: '121px',
    },
  },
  tableWrapperMobile: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
  },
  addButtonWrapperMobile: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
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
    color: theme.palette.text.second,
  },
  checkboxCell: {
    width: '200px',
  },

  unitsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    paddingTop: 1,
  },

  unitsText: {
    color: theme.palette.text.second,
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
  tableRow: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  addButtonWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  boxesTitle: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '140%',
      fontWeight: 600,
      color: theme.palette.text.general,
      textTransform: 'uppercase',
    },
  },

  boxesTitleWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  boxTitle: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '16px',
      color: theme.palette.text.second,
      marginBottom: '12px',
    },
  },
  boxTitleMobile: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
      color: theme.palette.text.general,
    },
  },
  sizeTitle: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '16px',
      color: theme.palette.text.second,
    },
  },
  footerBtnsWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))
