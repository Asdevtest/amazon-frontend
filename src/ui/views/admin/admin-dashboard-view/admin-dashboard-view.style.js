// import {createStyles} from '@mui/material'

export const styles = theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
    marginBottom: '24px',
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },
  mr2: {
    marginRight: theme.spacing(2),
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
})
