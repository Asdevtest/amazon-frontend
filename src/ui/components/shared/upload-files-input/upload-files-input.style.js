import { makeStyles } from 'tss-react/mui'

import { tooltipClasses } from '@mui/material/Tooltip'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  oneLineMainWrapper: {
    flexDirection: 'row',
  },

  errorText: {
    color: 'red',
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  mainSubWrapper: {
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  fullWidth: {
    width: '100%',
  },

  controlsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
    [theme.breakpoints.down(480)]: {
      flexDirection: 'column',
    },
  },

  label: {
    marginBottom: 5,
  },

  amazonLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    [theme.breakpoints.down(480)]: {
      flexDirection: 'column',
    },
  },

  loadImageInput: {
    height: '40px',
    borderRadius: '7px',
    width: 'calc(100% - 192px)',
    border: `1px solid #424250`,
    [theme.breakpoints.down(480)]: {
      width: '100%',
    },
  },

  loadImageInputSmall: {
    width: '46%',
  },

  inputColor: {
    color: `${theme.palette.text.general} !important`,
    [theme.breakpoints.down(768)]: {
      height: 68,
    },
    [theme.breakpoints.down(480)]: {
      width: '100%',
    },
  },

  loadBtn: {
    width: '172px',
    color: '#fff',
    [theme.breakpoints.down(480)]: {
      width: '100%',
    },
  },

  attachFiles: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: 5,
  },

  dragAndDropBtn: {
    position: 'relative',
    width: '100%',
    height: '100px',
    color: theme.palette.text.general,
    background: theme.palette.background.second,
    border: ` 3px dashed rgba(${theme.palette.primary.mainRgb}, .7)`,
    borderRadius: '7px',
    transition: '0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.01)',
    },

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
      lineHeight: '19px',
      height: 80,
    },

    [theme.breakpoints.down(768)]: {
      height: 68,
    },
    [theme.breakpoints.down(480)]: {
      width: '100%',
    },
  },

  dragingOnDropBtn: {
    color: 'rgba(0,123, 255, 1)',
    background: 'rgba(0,255, 0, .3)',
  },

  minimizedDragAndDropBtn: {
    maxWidth: '185px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    color: theme.palette.primary.main,
    [theme.breakpoints.down(480)]: {
      width: '100%',
      maxWidth: '100%',
    },
  },

  oneLineDADBtn: {
    marginBottom: 20,
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '7px',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },

  actionBtnsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    [theme.breakpoints.down(1024)]: {
      gap: 5,
    },
  },

  buttonSecondary: {
    background: 'none',
    color: theme.palette.text.second,
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      opacity: '0.7',
      background: 'none',
    },

    '&:disabled': {
      cursor: 'auto',
      background: 'none',
      color: theme.palette.text.second,
      borderColor: theme.palette.text.second,
    },

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
      padding: 10,
    },
  },

  imagesCount: {
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    color: theme.palette.text.second,
  },

  imagesCountSpan: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.primary.main,
    marginRight: 5,
  },

  //

  imageListWrapper: {
    width: 380,
    maxHeight: 120,
    overflowY: 'auto',
    padding: '0 10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },

  imageLinkListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  image: {
    width: 55,
    height: 55,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 7,
  },

  inputIndexWrapper: {
    marginRight: 0,
  },

  inputIndex: {
    fontWeight: 600,
    marginLeft: 5,
    height: 55,
  },

  imageObjInput: {
    width: 133,
    height: 55,
    padding: '5px 0',
  },

  subImageObjInput: {
    height: '50px !important',
    padding: '0 10px',
    fontSize: 16,
    lineHeight: '17px',
    overflowY: 'auto !important',
  },

  actionIconsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    gap: 10,
  },

  actionIcon: {
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  tooltipWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  tooltipText: {
    maxWidth: '300px',
    fontSize: 16,
    lineHeight: '19px',
  },

  preloaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    position: 'relative',
    cursor: 'pointer',
    borderRadius: 7,
  },

  preloaderContainerTooltip: {
    width: 300,
  },

  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(0, 0, 0, 0.5)',
  },

  preloaderIcon: {
    width: '18px !important',
    height: '18px !important',
    color: '#fff',
  },
}))
