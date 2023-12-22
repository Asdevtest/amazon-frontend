import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  previewSlides: {
    padding: '5px 15px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflow: 'hidden',
  },

  previewSlidesFitOnScreenWithoutArrows: {
    padding: '0 15px',
    overflow: 'inherit',
  },

  previewSlide: {
    height: 46,
    minHeight: 46, // fix hidden bug
    overflow: 'hidden',
    width: 71,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },

  previewSlideActive: {
    border: `0.5px solid ${theme.palette.primary.main}`,
  },

  previewSlideImg: {
    width: '100%',
    height: 46,
    objectFit: 'contain',
  },

  document: {
    height: '75%',
    width: '75%',
  },

  fileIcon: {
    height: '100% !important',
    width: '100% !important',
  },

  linkText: {
    display: 'none',
  },
}))
