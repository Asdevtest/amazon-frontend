/* eslint-disable no-unused-vars */
export const styles = theme => ({
  isFormedWrapper: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  isFormedSubWrapper: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
  },

  shopsDataWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    // maxHeight: 500,
    padding: '10px 0',
    gap: 20,
  },

  shopsDataWrapperBlocked: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  searchInputWrapper: {
    width: 255,
    height: 30,
  },
  searchInput: {
    border: '1px solid #E0E0E0',
    width: '100%',
    height: '100%',
  },

  shopsBody: {
    width: 255,
    minHeight: 50,
    maxHeight: 245,
    overflowY: 'auto',
    textAlign: 'center',

    boxShadow: theme.palette.boxShadow.filter,
  },

  shop: {
    display: 'flex',
    alignItems: 'center',
  },
  shopName: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  noOptionText: {
    color: theme.palette.text.second,
    padding: '10px 0',
  },

  orderStatusDataWrapper: {
    display: 'flex',
    padding: '7px 0 7px 7px',
  },
  orderStatusDataBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    width: 225,
    maxHeight: 420,
    overflowY: 'auto',
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    cursor: 'pointer',
  },
  orderStatusName: {
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  radioGroupTwoItems: {
    display: 'flex',
    gap: 20,
    color: theme.palette.text.general,
    maxHeight: 200,
    overflowY: 'auto',
  },
  formControl: {
    width: 255,
    display: 'flex',
    gap: 10,
    // marginBottom: 20,
  },
  radioLable: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
  },
  radioOption: {
    display: 'flex',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,

    margin: 0,
    gap: 5,
  },
  radioControl: {
    padding: 0,
  },

  fromToDatesWrapper: {
    padding: '0 10px',
  },

  fromToDatesSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // flexGrow: 1,
    marginBottom: 5,
  },

  fromToText: {
    margin: '0 10px',
  },

  dateInput: {
    width: 200,
  },

  numInputsWrapper: {
    width: 255,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // flexGrow: 1,
    marginBottom: 5,
    // gap: 40,
  },

  numInput: {
    width: 110,
    height: 30,
    textAlign: 'center',
  },

  formedRadioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  redFlagsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  universalFilterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    padding: '20px 21px',
    gap: 20,
  },

  universalFilterSearchInputWrapper: {
    width: '100%',
    height: 30,
  },

  universalFilterBody: {
    width: '100%',
    minHeight: 50,
    maxHeight: 255,
    overflowY: 'auto',
    textAlign: 'center',
    boxShadow: theme.palette.boxShadow.filter,
  },

  fullName: {
    width: 'max-content',
  },

  dateDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 310,
    padding: '10px 20px',
    gap: 20,
  },

  searchLabel: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
    marginRight: 10,
  },

  radioOptions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },

  radioOptionDate: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
    textTransform: 'capitalize',
  },

  inpunts: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    padding: 10,
    border: `1px solid #656565`,
    borderRadius: 7,
  },

  inpuntContainer: {
    display: 'flex',
    gap: 10,
  },

  inpunt: {
    width: 80,
    borderBottom: `1px solid #656565`,
  },

  redFlagIcon: {
    width: 24,
    height: 24,
  },
})
