import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'space-between',
    height: '100%',
  },

  categoryContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
  },

  categoryText: {
    width: 'max-content',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  categoryTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  categoresWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  resultWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  resultButton: {
    padding: '0 20px',
    height: '30px',
    whiteSpace: 'nowrap',
  },

  linkStyles: {
    color: theme.palette.primary.main,
  },

  draftStatus: {
    color: `${theme.palette.primary.main} !important`,
  },

  requestWrapper: {
    display: 'flex',
    gap: '5px',
  },

  clearIcon: {
    width: '20px !important',
    height: '20px !important',
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    color: theme.palette.text.second,
  },
}))
