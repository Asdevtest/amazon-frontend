import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  boxWrapper: {
    padding: '20px 30px',
    margin: '0 2px',
    [theme.breakpoints.down(768)]: {
      padding: '20px 20px',
    },
  },
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },
  buttonsWrapper: {},

  currentBox: {
    marginBottom: '20px',
    width: '690px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  // newBoxesWrapper: {
  //   maxHeight: '730px',
  //   overflow: 'auto',
  //   overflowX: 'hidden',
  // },
  newBoxes: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  itemsWrapper: {
    marginTop: '5px',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '14px',
    marginLeft: '10px',
  },
  select: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
  },
  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    // padding: '10px',
    width: '100%',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    [theme.breakpoints.down(768)]: {
      gap: '10px',
    },
  },
  categoryTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '5px',
    marginTop: '10px',
    height: '220px',
  },
  editBtn: {
    width: '183px',
    height: '40px',
    display: 'flex',
  },
  bottomBlockWrapper: {
    marginTop: '20px',
  },
  editBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '20px',
    },
  },
  noEditBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  superWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  barCodeActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  shippingLabelField: {
    marginLeft: '5px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
    width: '250px',
    height: '45px',
    overflowX: 'auto',
  },
  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      margin: '0 5px',
      flexDirection: 'column',
    },
  },

  boxInfoWrapper: {
    display: 'flex',
    // gap: '46px',
    justifyContent: 'space-between',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '30px',
    },
  },

  imagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  photoWrapper: {
    width: '300px',
    marginLeft: '20px',
    minHeight: '150px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
    },
  },

  photoSubWrapper: {
    height: '100px',
    marginTop: '10px',
    [theme.breakpoints.down(768)]: {
      height: '250px',
    },
  },

  imgBox: {
    width: '230px',
    height: '100px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  link: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',

    color: theme.palette.text.general,
  },

  checkboxContainer: {
    display: 'flex',
    // justifyContent: 'space-between',
    width: '100%',
    margin: 0,
  },

  imageLinkListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',
    padding: '5px',

    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    width: 90,
    justifyContent: 'space-between',
    margin: '0',
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  image: {
    width: 120,
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    background: '#EFEFEF',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: 3,
  },

  fileName: {
    maxWidth: 120,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',
  },

  tooltipWrapper: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  linkTypo: {
    height: '100px',
    color: 'white',
    width: '300px',
    overflowX: 'auto',
  },

  tooltipText: {
    maxWidth: '300px',
  },

  greenText: {
    color: 'green',
  },

  field: {
    width: '330px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  sectionTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },
  sectionTitleWrapper: {
    marginBottom: '20px',
    [theme.breakpoints.down(768)]: {
      marginTop: '30px',
    },
  },

  hideBlock: {
    maxHeight: 0,
    overflow: 'hidden',
  },

  showFullBlock: {
    maxHeight: '100%',
    overflow: 'visible',
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    },
  },

  tablePanelViewText: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  photoAndFilesTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: '600',
    [theme.breakpoints.down(768)]: {
      width: '243px',
      textAlign: 'center',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: 400,
  },
  labelShipping: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: 400,
    [theme.breakpoints.down(768)]: {
      width: '100px',
    },
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '14px',
    },
  },

  barCodeField: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
    fontWeight: '400',
  },

  subTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: 600,
    [theme.breakpoints.down(768)]: {
      padding: 0,
    },
  },
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  receiveBoxWrapper: {
    width: '690px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      marginBottom: '50px',
    },
  },

  receiveBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    width: '183px',
    height: '40px',
  },

  receiveBoxTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.text.general,
    marginTop: '90px',
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      marginTop: '40px',
    },
  },

  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  checkboxSizesContainer: {
    width: '190px',
    marginLeft: '5px',
    marginTop: '30px',
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },

  sizesLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#c4c4c4',
    cursor: 'pointer',
  },

  selectedLabel: {
    color: theme.palette.primary.main,
  },
  selectedIndicator: {
    backgroundColor: '#006CFF',
  },
  toggleItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  indicator: {
    display: 'block',
    backgroundColor: '#006CFF',
    width: '2px',
    height: '10px',
  },

  editAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
  },

  chipWrapperEditAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
    padding: 5,
  },

  toggleSizesWrapper: {
    marginRight: 30,
  },

  standartText: {
    color: theme.palette.text.general,
  },
  smallLabel: {
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: theme.palette.text.second,
    },
  },
  mobileDemensions: {
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
    },
  },
  imageBox: {
    [theme.breakpoints.down(768)]: {
      width: '180px',
    },
  },
}))
