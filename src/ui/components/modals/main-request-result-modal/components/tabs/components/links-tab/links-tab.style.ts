import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  links: {
    height: 250,
    overflow: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(auto-fill), 1fr)',
    alignContent: 'start',
    gap: 25,
  },

  clientLinks: {
    height: 330,
  },

  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  addLinkContainer: {
    width: 255,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  input: {
    height: 'max-content',
    flexShrink: 1,
  },

  button: {
    padding: 2,
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

  icon: {
    padding: 2,
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },
}))
