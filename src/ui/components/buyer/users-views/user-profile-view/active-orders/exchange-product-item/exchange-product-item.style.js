import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '32px',
    fontWeight: 500,
  },
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
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
