import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tagTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  tagItem: {
    display: 'flex',
    maxWidth: '150px',
    borderRadius: '25px',
    margin: 0,
  },

  activeButton: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}))
