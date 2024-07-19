import { makeStyles } from 'tss-react/mui'

import { tooltipClasses } from '@mui/material/Tooltip'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  currentBox: {},

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  sectionTitle: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  btnsWrapper: {
    display: 'flex',
    gap: 20,
  },

  divider: {},

  newBoxes: {},

  boxWrapper: {
    padding: 20,
    background: theme.palette.background.second,
    borderRadius: 4,
  },

  boxWrapperWithShadow: {
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
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

  itemsWrapper: {},

  mainPaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },

  bottomBlockWrapper: {
    marginTop: '20px',
  },
  editBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },

  boxInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  imagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  photoWrapper: {
    width: '300px',
    marginLeft: '20px',
    minHeight: '120px',
  },

  link: {
    maxWidth: '325px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    color: theme.palette.text.general,
  },

  checkboxContainer: {
    width: 'fit-content',
    display: 'flex',
    margin: 0,
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
  },

  field: {
    width: 330,
    height: 40,
  },

  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    cursor: 'pointer',
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
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
    fontWeight: 400,
  },

  footerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  footerSubWrapper: {
    paddingLeft: '10px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  footerTrackNumberWrapper: {
    borderRadius: 4,
    padding: 5,
    border: `1px solid ${theme.palette.input.customBorder}`,
    display: 'flex',
    justifyContent: 'space-between',
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
    justifySelf: 'center',
    position: 'sticky',
    top: 0,
    paddingTop: 20,
  },

  boxImageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 15,
    marginBottom: 90,
  },

  bigBoxSvg: {
    width: 220,
    height: 230,
  },

  boxArrowSvg: {
    width: '74px !important',
    height: '74px !important',
    color: theme.palette.primary.main,
  },

  receiveBoxTitle: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
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

  countSuperBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  countSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    marginBottom: 5,
  },

  subTitleOne: {
    fontSize: '14px',
    color: theme.palette.text.second,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },

  yellowBorder: {
    height: '100%',
    padding: 10,
    border: '1px solid #F5CF00',
    borderRadius: 10,
  },
}))
