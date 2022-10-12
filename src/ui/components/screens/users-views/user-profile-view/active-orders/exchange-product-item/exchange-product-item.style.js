import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: theme.palette.text.general,
    fontSize: '32px',
    fontWeight: 500,
  },
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.text.general,
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
