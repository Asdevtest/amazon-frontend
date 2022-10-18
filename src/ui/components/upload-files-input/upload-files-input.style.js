import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    minWidth: '250px',
    height: '100px',
    border: ' 3px dashed rgba(0,123, 255, .7)',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: '10px',

    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.second,

    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  actionBtnsWrapper: {
    marginTop: '10px',
    minWidth: '250px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  showImagesBtn: {
    maxHeight: '32px',
    width: '110px',
    transition: '0.3s ease',
    border: ' 1px solid rgba(0,123, 255, .7)',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: '10px',

    color: '#001029',

    '&:hover': {
      opacity: '0.7',
    },
  },

  imagesCount: {
    fontSize: '12px',
    textAlign: 'center',

    color: theme.palette.text.second,
  },

  imagesCountSpan: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.primary.main,
  },

  removeAllBtn: {
    maxHeight: '32px',
    width: '90px',
    transition: '0.3s ease',
    border: ' 1px solid rgba(0,123, 255, .7)',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    borderRadius: '10px',

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
    width: '95%',
    margin: '0 auto',
    maxHeight: '250px',
    overflowY: 'auto',
  },

  image: {
    width: '80px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
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
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    // background: '#EFEFEF',

    background: theme.palette.background.second,

    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  imageLinkListItem: {
    overflow: 'hidden',
    border: ' 1px solid rgba(0,123, 255, .7)',
    borderRadius: '10px',
    // background: '#EFEFEF',

    background: theme.palette.background.second,
    padding: '5px',

    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    width: '280px',
    justifyContent: 'space-between',
    margin: '0',
  },

  actionIconsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
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
  },

  loadImageInput: {
    height: '40px',
    borderRadius: '8px',
    width: 'calc(100% - 182px)',

    border: `1px solid #424250`,
  },

  inputColor: {
    color: `${theme.palette.text.general} !important`,
  },

  loadBtn: {
    marginLeft: '10px',
    borderRadius: '4px',
    height: '40px',
    width: '172px',
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

  '@media (max-width: 768px)': {
    dragAndDropBtn: {
      height: '68px',
    },
  },
}))
