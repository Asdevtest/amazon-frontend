import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: 445,
    padding: '0 5px 5px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    marginBottom: 10,
    color: theme.palette.text.general,
    textTransform: 'capitalize',
  },

  files: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 100px)',
    gridTemplateRows: 'repeat(auto-fill, 100px)',
    gap: 5,
  },

  file: {
    position: 'relative',
    height: 100,
    width: 100,
    borderRadius: 6,
    cursor: 'pointer',
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 6,
  },

  video: {
    borderRadius: 6,
  },

  checkbox: {
    position: 'absolute',
    top: -1,
    right: -1,
    padding: 0,
    borderRadius: '0 6px 0 6px',
    background: theme.palette.background.general,

    '&:hover': {
      background: theme.palette.background.general,
    },
  },

  noPhotos: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gridColumn: '3 / span 2',
    gridRow: '2 / span 1',

    fontSize: 18,
    lineHeight: '25px',
  },
}))
