import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    maxHeight: 445,
    padding: '0 5px 0',
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

  slides: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 100px)',
    gridTemplateRows: 'repeat(auto-fill, 100px)',
    gap: 5,
  },

  slide: {
    height: 100,
    width: 100,
    borderRadius: 6,
    overflow: 'hidden',
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
  },

  noPhotos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gridColumn: '3 / span 2',
    gridRow: '2 / span 1',

    fontSize: 18,
    lineHeight: '25px',
  },
}))
