import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  fullWidth: {
    width: '100%',
  },

  oneLineMainWrapper: {
    flexDirection: 'row',
  },

  errorText: {
    fontWeight: 600,
    color: theme.palette.text.red,
  },

  controlsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  loadInputContainer: {
    marginBottom: 10,
  },

  loadInputContainerMinimized: {
    marginBottom: 0,
  },

  amazonLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,

    button: {
      width: '20%',
      margin: 0,
    },
  },

  loadImageInput: {
    flexShrink: 1,
    height: 40,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 20,
  },

  loadImageInputSmall: {
    width: '46%',
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
    height: 80,
    color: theme.palette.text.general,
    background: theme.palette.background.second,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: 20,
    transition: '0.3s ease',
    opacity: 1,
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.8,
    },
  },

  dragingOnDropBtn: {
    color: theme.palette.primary.main,
    background: 'rgba(0,255, 0, .3)',
  },

  minimizedDragAndDropBtn: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    color: theme.palette.primary.main,
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },

  actionBtnsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    button: {
      whiteSpace: 'nowrap',
    },
  },

  imagesCount: {
    marginTop: 5,
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.second,
  },

  imagesCountSpan: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginRight: 5,
  },

  imageListWrapper: {
    width: 380,
    maxHeight: 95,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
  },

  imageLinkListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  file: {
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    cursor: 'pointer',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  commentInputContainer: {
    margin: 0,
    width: 105,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  commentInputClasses: {
    height: 45,
  },

  commentInput: {
    padding: 5,
    height: 45,
    fontSize: 12,
    lineHeight: '16px',
  },

  actionIconsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
  },

  actionIcon: {
    cursor: 'pointer',
    transition: '0.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },
}))
