import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  amountWithLabelCardsWrapper: {
    marginTop: theme.spacing(4),
  },
  userInfoWrapper: {
    marginBottom: theme.spacing(5),

    padding: '40px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.05)',
  },
  cardImg: {
    width: '145px',
    height: '145px',
  },
  userInfoLeftWrapper: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
}))
