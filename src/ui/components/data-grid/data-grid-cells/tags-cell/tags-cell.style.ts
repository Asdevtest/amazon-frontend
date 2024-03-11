import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  tags: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 0',
  },

  tagItem: {
    maxWidth: 130,
    fontSize: 14,
    textAlign: 'left',
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
