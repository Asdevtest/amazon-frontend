import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  files: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 305px)',
    gridTemplateRows: 'repeat(5, 50px)',
    gap: 15,
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
  },

  slidesTransition: {
    opacity: 0,
  },

  fileWrapper: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 10,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
  },

  file: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  fileName: {
    maxWidth: 170,
    height: 19,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
  },

  buttonIcon: {
    width: 30,
    height: 30,
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.8,
    },
  },

  icon: {
    padding: 5,
    width: '30px !important',
    height: '30px !important',
  },

  downloadIcon: {
    color: theme.palette.text.second,
  },

  noDocuments: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gridColumn: '1 / span 2',
    gridRow: '3 / span 1',

    fontSize: 18,
    lineHeight: '25px',
  },
}))
