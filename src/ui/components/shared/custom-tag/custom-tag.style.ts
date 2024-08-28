import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tagTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  tagItem: {
    display: 'flex',
    maxWidth: '200px',
    borderRadius: '25px',
  },

  activeButton: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}))
