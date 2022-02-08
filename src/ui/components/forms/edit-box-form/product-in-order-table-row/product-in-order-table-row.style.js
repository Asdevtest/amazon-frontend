import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  product: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fields: {
    display: 'flex',
    '& > div': {
      marginRight: theme.spacing(2),
    },
  },
  img: {
    width: '64px',
    height: '64px',
    marginRight: theme.spacing(2),
    objectFit: 'contain',
    objectPosition: 'center',
  },
  imgWithTitles: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  inputNumber: {
    width: '80px',
  },
  inputText: {
    width: '160px',
  },
  descriptionWrapper: {},
  amazonTitle: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  barCodeTypo: {
    height: '50px',
    whiteSpace: 'nowrap',
    width: '300px',
    overflowX: 'scroll',
  },

  buyerComment: {
    height: '60px',
    width: '300px',
    overflowX: 'scroll',
  },
}))
