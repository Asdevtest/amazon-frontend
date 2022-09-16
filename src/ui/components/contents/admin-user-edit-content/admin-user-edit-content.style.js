import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  // '@global': {
  //   '@keyframes pulse': {
  //     '0%': {
  //       boxShadow: '0 0 #006CFF',
  //     },
  //     '100%': {
  //       boxShadow: '0 0 0 5px #006aff91',
  //     },
  //   },
  // },

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
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '56px',
    rowGap: '20px',
    // overflow: 'auto',
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
    // margin: '0 20px',
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
    margin: 0,
  },

  allowedRoleRateContainer: {
    margin: 0,
    width: '38px',
  },
  roleContainer: {
    width: '270px',
  },
  allowedRoleContainer: {
    margin: 0,
    width: '139px',
  },

  overdraftContainer: {
    width: '270px',
  },

  allowedRoleWrapperTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: '#001029',
    marginBottom: '10px',
  },

  leftContentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '47px',
  },

  allowedRoleWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px',
    borderRadius: '4px',
  },

  allowedRoleRateInput: {
    borderRadius: 0,
    border: 0,
    borderBottom: '1px solid #656565',
    height: '19px',
  },

  selectedRoleWrapper: {
    border: '1px solid #C4C4C4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '0 15px',
    borderRadius: '4px',
    marginBottom: '10px',
  },

  selectedRole: {
    width: '139px',
  },

  actionDelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  actionButton: {
    width: '22px',
    height: '22px',
    fontSize: '18px',
    // backgroundColor: '#006CFF',
    // borderRadius: '4px',
    color: '#00B746',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  actionTagButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    fontSize: '18px',
    backgroundColor: '#006CFF',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    marginRight: '15px',
  },

  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '24px',
    backgroundColor: '#CCE2FF',
    padding: '5px 15px',
    borderRadius: '4px',
  },

  removeTagButton: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  allowedStrategiesContainer: {
    marginTop: '20px',
  },

  tagsWrapper: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },

  securityButton: {
    width: '100%',
  },

  roleSelect: {
    width: '139px',
  },

  // actionPulseButton: {
  //   animation: 'pulse .8s infinite ease-in-out',
  // },
}))
