import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  previewSlides: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      display: 'none !important',
    },
  },

  previewSlidesInModal: {
    gap: 20,
  },

  previewSlidesFitOnScreenWithoutArrows: {
    padding: '0 5px',
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

    button: {
      p: {
        width: '75%', // fix unequal size ratio
      },
    },
  },

  previewSlideInModal: {
    height: 94,
    minHeight: 94,
    width: 136,
    borderRadius: 8,
  },

  previewSlideActive: {
    border: `0.5px solid ${theme.palette.primary.main}`,
  },
}))
