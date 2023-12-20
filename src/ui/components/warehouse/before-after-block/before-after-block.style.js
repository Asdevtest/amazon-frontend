import { makeStyles } from 'tss-react/mui'

import { tooltipClasses } from '@mui/material/Tooltip'

export const useClassNames = makeStyles()(theme => ({
  boxWrapper: {
    padding: '20px 30px',
    margin: '0 2px',

    background: theme.palette.background.second,

    borderRadius: 4,

    [theme.breakpoints.down(768)]: {
      padding: '20px 20px',
    },
  },
  boxWrapperWithShadow: {
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  },
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  trackNumberPhotoWrapper: {
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trackNumberNoPhotoText: {
    textAlign: 'center',
  },

  divider: {
    gridColumn: '2 / 3',
  },

  currentBox: {
    marginBottom: '20px',
    width: '690px',
    gridColumn: '1 / 2',

    [theme.breakpoints.down(1282)]: {
      width: 550,
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  newBoxes: {
    [theme.breakpoints.down(1282)]: {
      width: 550,
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  itemsWrapper: {
    marginTop: '5px',
  },

  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    width: '100%',
  },

  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    [theme.breakpoints.down(1282)]: {
      width: '100%',
      justifyContent: 'space-between',
      paddingRight: 10,
    },
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

    [theme.breakpoints.down(1282)]: {
      minWidth: 180,
    },
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

  barCodeActionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
    justifyContent: 'space-between',
    marginBottom: 20,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '30px',
    },
  },

  imagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    [theme.breakpoints.down(1282)]: {
      paddingLeft: 20,
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  photoWrapper: {
    width: '300px',
    marginLeft: '20px',
    minHeight: '120px',
    [theme.breakpoints.down(1282)]: {
      width: '100%',
      minHeight: 200,
    },
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
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
    justifyContent: 'space-between',
    width: '100%',
    margin: 0,
    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
  },

  warningAccent: {
    outline: '2px solid red',
    borderRadius: 4,
    paddingLeft: 5,
    marginBottom: 5,
  },

  successAccent: {
    outline: '2px solid green',
    borderRadius: 4,
    paddingLeft: 5,
    marginBottom: 5,
  },

  imageLinkListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.second,
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
    width: 60,
    height: 70,
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imageListItem: {
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.second,
    width: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
    padding: 3,
    [theme.breakpoints.down(768)]: {
      width: '90px',
    },
  },

  fileName: {
    maxWidth: 120,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',

    color: theme.palette.text.second,
  },

  linkName: {
    maxWidth: 120,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',
    color: theme.palette.text.second,
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
    color: theme.palette.text.green,
    [theme.breakpoints.down(768)]: {
      marginLeft: '40px',
    },
  },

  field: {
    width: 330,
    height: 40,
    [theme.breakpoints.down(1282)]: {
      width: 260,
    },
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

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    cursor: 'pointer',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
    },
  },

  tablePanelViewText: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  photoAndFilesTitle: {
    marginBottom: 10,
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

    [theme.breakpoints.down(1282)]: {
      width: 'fit-content',
    },
  },

  footerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  footerSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(1282)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '14px',
    },
  },

  footerTrackNumberWrapper: {
    borderRadius: 4,
    padding: 5,
    border: `1px solid ${theme.palette.input.customBorder}`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(1282)]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      gap: '14px',
    },
  },

  trackNum: {
    maxWidth: 400,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
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
    [theme.breakpoints.down(1282)]: {
      width: '100%',
    },
    [theme.breakpoints.down(768)]: {
      padding: 0,
    },
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  receiveBoxWrapper: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 'fit-content',
    gridColumn: '2 / 4',
    justifySelf: 'center',
    position: 'sticky',
    top: 0,
    paddingTop: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      padding: '50px 0',
      marginBottom: 20,
    },
  },

  boxImageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,
    marginBottom: 90,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      marginBottom: 40,
    },
  },

  bigBoxSvg: {
    width: 220,
    height: 230,

    [theme.breakpoints.down(768)]: {
      width: 145,
      height: 152,
    },
  },

  boxArrowSvg: {
    width: '74px !important',
    height: '74px !important',
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      width: '49px !important',
      height: '49px !important',
    },
  },

  receiveBoxTitle: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      marginBottom: 30,
      fontSize: 14,
      lineHeight: 19,
    },
  },

  button: {
    width: 183,
    height: 40,
  },

  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },

  editAccent: {
    border: '2px solid #F5CF00',
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

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btnsWrapper: {
    display: 'flex',
    gap: 20,
  },

  countSuperBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 5,

    [theme.breakpoints.down(1282)]: {
      paddingRight: 10,
    },
  },

  countSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    marginBottom: 5,
    [theme.breakpoints.down(1282)]: {
      gap: 5,
      paddingRight: 10,
    },
  },

  subTitleOne: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },
}))
