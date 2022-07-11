import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  balanceButtonsWrapper: {
    display: 'flex',
    '& > button': {
      marginRight: '40px',
    },
    '& > button:last-child': {
      marginRight: '0px',
    },
  },
  buttonWrapper: {
    textAlign: 'right',
    marginTop: 30,
  },
  rightBtn: {
    marginLeft: 30,
  },
  modalContainer: {
    minWidth: '460px',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px',
    marginTop: '-12px',
    marginBottom: '8px',
  },
  checkboxLabel: {
    fontWeight: 600,
  },
  isWrongPermissionsSelectError: {
    color: 'red',
    marginBottom: '15px',
  },

  userRoleSelect: {
    '&:disabled': {
      color: '#DEDEDE',
    },
  },

  subUsersWrapper: {
    maxHeight: '150px',
    overflow: 'auto',
  },

  ratingWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },

  ratingSubWrapper: {
    display: 'flex',
  },

  rating: {
    margin: '0 20px',
  },

  mainWrapper: {
    marginTop: 20,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  root: {
    width: '100%',
    padding: 20,
  },

  leftWrapper: {
    width: '42%',
  },

  middleWrapper: {
    width: '28%',
  },

  rightWrapper: {
    width: '23%',
  },

  nameEmailWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  roleRateWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  button: {
    padding: '7px 33px',
  },
}))
