import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  slides: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    gap: 18,
    paddingRight: 20,
    maxHeight: 'calc(80vh - 80px)',

    [theme.breakpoints.down(768)]: {
      maxHeight: '273px',
      overflow: 'auto',
      paddingRight: 0,
      gap: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },

  slide: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
    padding: '10px',
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '4px',
    cursor: 'pointer',
    maxWidth: 120,
    width: '100%',

    img: {
      width: '100%',
      height: 74,
      borderRadius: '4px',
      objectFit: 'contain',
    },

    p: {
      overflowWrap: 'anywhere',
    },

    [theme.breakpoints.down(768)]: {
      width: 'max-content',
      padding: 5,
    },
  },

  activeSlide: {
    border: `1px solid ${theme.palette.primary.main}`,
  },

  fileIcon: {
    height: '74px !important',
    width: '74px !important',
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
  },

  shortText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 100,
  },
}))
