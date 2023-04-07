import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainContentWrapper: {
    position: 'relative',
    width: '100%',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  mainSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  oneLineMainWrapper: {
    flexDirection: 'row',
  },

  dragAndDropBtn: {
    width: 185,
    height: 40,
    border: '3px dashed rgba(0,123, 255, .7)',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: 4,

    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.second,

    position: 'absolute',

    top: 37,
    right: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,

    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  dragingOnDropBtnWithoutTitle: {
    top: '0 !important',
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '10px',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  actionBtnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  showImagesBtn: {
    // maxHeight: '32px',
    // width: '110px',

    padding: '11px 14px 10px',
    transition: '0.3s ease',
    border: ' 1px solid rgba(0,123, 255, .7)',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: '4px',

    color: '#001029',

    '&:hover': {
      opacity: '0.7',
    },
  },

  imagesCount: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-wrap',

    fontSize: 12,

    color: theme.palette.text.second,
  },

  imagesCountSpan: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.primary.main,
  },

  removeAllBtn: {
    // maxHeight: '32px',
    // width: '90px',
    padding: '11px 14px 10px',

    transition: '0.3s ease',
    border: ' 1px solid rgba(0,123, 255, .7)',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: '4px',

    color: '#001029',
    '&:hover': {
      opacity: '0.7',
    },
  },

  dragingOnDropBtn: {
    color: 'rgba(0,123, 255, 1)',
    background: 'rgba(0,255, 0, .3)',
  },

  imageListWrapper: {
    // width: '95%',
    margin: '0 auto',
    // maxHeight: 250,
    maxHeight: 300,
    overflowY: 'auto',
  },

  oneLineMaxHeight: {
    maxHeight: 100,
  },

  image: {
    width: 55,
    height: 55,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  tooltipText: {
    maxWidth: '300px',
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  tooltipWrapper: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  fileName: {
    maxWidth: '80px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '9px',

    color: theme.palette.text.second,
  },

  linkName: {
    maxWidth: '160px',
    height: '80px',
    overflow: 'auto',
    fontSize: '10px',

    color: theme.palette.text.second,
  },

  imageListItem: {
    overflow: 'hidden',
    // border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    // background: '#EFEFEF',

    // background: theme.palette.background.second,

    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 10,
  },

  imageLinkListItem: {
    overflow: 'hidden',
    // border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    // background: '#EFEFEF',

    // background: theme.palette.background.second,
    padding: '3px',

    display: 'flex',
    alignItems: 'center',
    gap: 5,
    // width: '280px',
    justifyContent: 'space-between',
    margin: '0',
  },

  actionIconsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    gap: 10,
  },
  actionIcon: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  amazonLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '2%',
  },

  loadImageInput: {
    height: '40px',
    borderRadius: '8px',
    width: '55%',

    border: `1px solid #424250`,
  },
  loadImageInputSmall: {
    width: '46%',
  },

  inputColor: {
    color: `${theme.palette.text.general} !important`,
  },

  loadBtn: {
    borderRadius: '4px',
    height: '40px',
    width: '130px',
  },

  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '18px',
  },

  linkTypo: {
    height: '100px',
    color: 'white',
    width: '300px',
    overflowX: 'auto',
  },

  icon: {
    color: theme.palette.primary.main,
  },

  '@media (max-width: 768px)': {
    dragAndDropBtn: {
      height: '68px',
    },
  },

  imageObjInput: {
    width: 133,
    height: 55,
    // overflow: 'auto',
  },

  subImageObjInput: {
    // width: 133,
    height: '55px !important',
    overflowY: 'auto !important',
  },

  inputIndex: {
    fontWeight: 600,
    marginLeft: 5,
    height: 55,
  },
}))
