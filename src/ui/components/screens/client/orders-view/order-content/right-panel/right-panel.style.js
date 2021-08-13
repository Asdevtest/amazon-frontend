import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  orderContainer: {
    padding: '16px 16px',
    minWidth: '500px',
    flexGrow: 6,
    maxWidth: '100%',
    flexBasis: '60%',
  },
  verticalDivider: {
    margin: '-16px 32px',
  },
  horizontalDivider: {
    margin: '16px 0',
  },
  deliveryInfoWrapper: {
    display: 'flex',
  },
}))
