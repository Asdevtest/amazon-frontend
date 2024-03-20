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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(auto-fill), 50px)',
    gap: 15,
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
    maxWidth: 140,
    height: 19,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  checkbox: {
    padding: 0,
    borderRadius: 0,
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
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
    color: theme.palette.text.general,
  },

  noDocuments: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    gridColumn: '1 / span 2',
    gridRow: '3 / span 1',

    fontSize: 18,
    lineHeight: '25px',
  },
}))
