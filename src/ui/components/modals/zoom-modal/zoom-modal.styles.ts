import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modal: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagesWrapper: {
    overflow: 'hidden',
  },

  images: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',

    width: '86vw',
    height: '93vh',
  },

  imageWrapper: {
    display: 'flex',
    flex: '1 0 100%',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    cursor: 'pointer',
  },

  arrowIcon: {
    margin: 20,
    width: '60px !important',
    height: '60px !important',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  arrowIconDisable: {
    color: '#C4C4C4',
    cursor: 'auto',
  },
}))
