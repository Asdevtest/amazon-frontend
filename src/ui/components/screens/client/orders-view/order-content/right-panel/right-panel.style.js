import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  orderContainer: {
    padding: '16px 32px',
    minWidth: '900px',
    flexGrow: 6,
    maxWidth: '100%',
    flexBasis: '60%',
  },
  verticalDivider: {
    margin: '-16px 32px',
  },
  horizontalDivider: {
    margin: '16px -32px',
  },
  deliveryInfoWrapper: {
    display: 'flex',
  },
}))
