import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  files: {
    position: 'relative',
    padding: 5,
    height: 300,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    overflow: 'auto',

    '&::-webkit-scrollbar': {},
  },

  fileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  file: {
    height: 109,
    width: 109,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 5,
    borderRadius: 4,
    boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
