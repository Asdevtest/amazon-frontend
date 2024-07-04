import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  links: {
    height: 173,
    overflow: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(auto-fill), 1fr)',
    alignContent: 'start',
    gap: 13,
  },

  clientLinks: {
    height: 215,
  },

  addLinkContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  inputRoot: {
    height: 32,
    flexShrink: 1,
  },

  addInput: {
    width: 230,
  },

  input: {
    padding: 5,
    fontSize: 14,
    lineHeight: '19px',
  },

  button: {
    minWidth: 'max-content',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },
}))
