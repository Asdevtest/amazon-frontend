import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  file: {
    height: 109,
    width: 109,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 6,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    cursor: 'pointer',
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
}))
