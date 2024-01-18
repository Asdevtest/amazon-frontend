import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  img: {
    height: '64px',
    width: '64px',
  },
  typoCategory: {
    marginLeft: '8px',
  },
  typoPrice: {
    whiteSpace: 'nowrap',
  },
  standartPrice: {
    fontWeight: 600,
    color: '#646b73',
  },
}))
