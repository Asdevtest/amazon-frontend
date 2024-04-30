import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttonWrapper: {
    display: 'flex',
    gap: 30,
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  rightBtn: {
    marginLeft: 30,
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

    color: theme.palette.text.primary,
  },
  cancelBtn: {
    color: theme.palette.text.primary,
  },

  isWrongPermissionsSelectError: {
    color: 'red',
    marginBottom: '15px',
  },

  userRoleSelect: {
    color: theme.palette.text.primary,

    '&:disabled': {
      color: '#DEDEDE',
    },
  },

  subUsersWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '56px',
    rowGap: '20px',
  },

  ratingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    overflow: 'hidden',
  },

  ratingSubWrapper: {
    display: 'flex',
  },

  rating: {
    color: theme.palette.text.primary,
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
    width: '600px',
  },

  middleWrapper: {
    width: '470px',
  },

  rightWrapper: {
    width: '270px',
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

  rateContainer: {
    width: '170px',
    marginBottom: '0 !important',
  },

  allowedRoleRateContainer: {
    marginBottom: '0 !important',
    gap: 10,
  },
  roleContainer: {
    width: '270px',
  },
  allowedRoleContainer: {
    marginBottom: '0 !important',
    width: 150,
  },

  overdraftContainer: {
    width: '270px',
  },

  allowedRoleWrapperTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.text.primary,
    marginBottom: '10px',
  },

  leftContentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    height: 30,
  },

  allowedRoleWrapper: {
    border: `1px solid ${theme.palette.input.customDisabled}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0px 15px 0px 2px',
    borderRadius: '4px',
  },

  allowedRoleRateInput: {
    borderRadius: 0,
    border: 0,
    borderBottom: '1px solid #656565',
    height: '19px',
    width: 60,
  },

  selectedRoleWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0 15px',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  selectedRole: {
    width: 262,
    color: theme.palette.text.primary,
  },

  actionDelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },

  actionButton: {
    width: '22px',
    height: '22px',
    fontSize: '18px',
    color: '#00B746',
    cursor: 'pointer',
  },

  allowedStrategiesContainer: {
    width: '470px !important',
    marginTop: '20px',
  },

  securityButton: {
    width: '100%',
  },

  standartText: {
    width: '100%',
    height: 40,
    color: theme.palette.text.primary,
  },

  standartTextRole: {
    width: 150,
  },

  selectRoot: {
    border: 'none',
    outline: 'none',

    height: 20,
    width: '139px',
    color: theme.palette.text.primary,
  },

  labelField: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    lineHeight: '19px',
  },
  field: {
    flexBasis: '100%',
    position: 'relative',
  },
  input: {
    height: '34px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },
  visibilityIcon: {
    position: 'absolute',
    right: 10,
    top: 35,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down(768)]: {
      top: 35,
    },
  },
  validationMessage: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '-15px',

    justifyContent: 'start',
    gap: '5px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexWrap: 'wrap',
    },
  },
  validationText: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
  },
  validationHiddenMessage: {
    display: 'flex',
    justifyContent: 'end',
  },
  validationHiddenText: {
    visibility: 'hidden',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
  },
  red: {
    color: 'red !important',
  },
  visibility: {
    visibility: 'visible',
  },
}))
