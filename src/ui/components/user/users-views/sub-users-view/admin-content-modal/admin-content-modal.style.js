/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  buttonWrapper: {
    textAlign: 'right',
  },
  rightBtn: {
    marginLeft: '10px',
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
}))
