import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tagItem: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  activeButton: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}))
