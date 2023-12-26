import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 290,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  asinAndSku: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  amazonTitle: {
    maxHeight: 200,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 22,
    lineHeight: '28px',

    display: '-webkit-box',
    WebkitLineClamp: 7,
    WebkitBoxOrient: 'vertical',
  },

  link: {
    fontSize: 16,
    lineHeight: '22px',
  },

  icon: {
    width: '22px !important',
    height: '22px !important',
  },
}))
