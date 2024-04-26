import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 1200,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  searchInput: {
    height: 32,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  product: {
    display: 'flex',
    alignItems: 'center',
    justifContent: 'flex-start',
    gap: 20,
  },

  productTitle: {
    minWidth: 0,
    maxWidth: 300,
    height: 57,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },

  links: {
    display: 'flex',
    flexDirection: 'column',
  },

  tableWrapper: {
    height: 500,
    width: '100%',
  },
}))
