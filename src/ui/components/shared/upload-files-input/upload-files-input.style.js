import { makeStyles } from 'tss-react/mui'

import { tooltipClasses } from '@mui/material/Tooltip'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingBottom: 3, // пробуеум фиксить поломку верстки при решении таски на прием

    [theme.breakpoints.down(768)]: {
      paddingBottom: 0,
    },
  },
  mainSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // maxWidth: 'max-content'

    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
    },
  },

  controlsWrapper: {
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  oneLineMainWrapper: {
    flexDirection: 'row',
  },

  dragAndDropBtn: {
    fontSize: 16,
    lineHeight: '21px',
    minWidth: '250px',
    width: '100%',
    height: '100px',
    border: ` 3px dashed rgba(${theme.palette.primary.mainRgb}, .7)`,
    transition: '0.3s ease',
    cursor: 'pointer',
    borderRadius: '7px',

    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.second,

    position: 'relative',

    '&:hover': {
      transform: 'scale(1.02)',
    },

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
      lineHeight: '19px',
      height: 80,
    },
  },

  minimizedDragAndDropBtn: {
    maxWidth: '185px',
    // minWidth: "185px",
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    gap: 20,
    minWidth: 'unset',
    height: 40,
    color: theme.palette.primary.main,
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
    marginTop: '10px',
    minWidth: '250px',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down(1024)]: {
      gap: 5,
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

  dragingOnDropBtn: {
    color: 'rgba(0,123, 255, 1)',
    background: 'rgba(0,255, 0, .3)',
  },

  imageListWrapper: {
    margin: '0 auto',
    maxHeight: 154,
    overflowY: 'auto',

    [theme.breakpoints.down(1024)]: {
      gap: 10,

      '& > div': {
        padding: '0 !important',
      },
    },
  },

  image: {
    width: 55,
    height: 55,
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 7,
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
    borderRadius: '7px',
    background: theme.palette.background.second,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    marginBottom: 10,
  },

  imageLinkListItem: {
    overflow: 'hidden',
    borderRadius: '7px',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
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
  },

  loadImageInput: {
    height: '40px',
    borderRadius: '7px',
    width: 'calc(100% - 182px)',

    border: `1px solid #424250`,
  },

  loadImageInputSmall: {
    width: '46%',
  },

  inputColor: {
    color: `${theme.palette.text.general} !important`,
  },

  loadBtn: {
    marginLeft: '10px',
    width: '172px',
    color: '#fff',
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

  attachFiles: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    marginBottom: 5,
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

  inputIndexWrapper: {
    marginRight: 0,
  },

  inputIndex: {
    fontWeight: 600,
    marginLeft: 5,
    height: 55,
  },

  label: {
    margin: '0 !important',
  },
}))
