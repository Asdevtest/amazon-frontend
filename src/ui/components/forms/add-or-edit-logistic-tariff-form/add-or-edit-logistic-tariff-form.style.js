import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '850px',
    [theme.breakpoints.down(768)]: {
      minWidth: 0,
      width: '280px',
    },
  },

  modalTitle: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },

  ratesTitleWrapper: {
    display: 'flex',

    gap: 40,
    alignItems: 'center',
  },

  modalSubTitle: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },

  button: {
    padding: '0 40px',
  },

  cancelBtn: {
    marginLeft: '10px',
    color: theme.palette.text.general,
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',

    padding: 0,
  },

  standartText: {
    color: theme.palette.text.second,
  },

  form: {
    marginTop: '20px',
    width: '100%',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  btnsWrapper: {
    display: 'flex',
    gap: 30,
    justifyContent: 'flex-end',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  nameDeliveryWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    height: 92,

    [theme.breakpoints.down(768)]: {
      width: '280px',
      flexDirection: 'column',
      gap: 0,
    },
  },

  longContainer: {
    width: '330px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  blockWrapper: {
    width: '800px',
    height: 92,
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    [theme.breakpoints.down(768)]: {
      width: '280px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  fieldLabel: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    whiteSpace: 'nowrap',
    color: theme.palette.text.second,
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
    },
  },

  blockItem: {
    display: 'flex',
    alignItems: 'flex-start',

    width: '200px',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  blockItemContainer: {
    width: '100%',
  },

  deadlineError: {
    borderBottom: '1px solid red',
    [theme.breakpoints.down(768)]: {
      borderBottom: 'none',
    },
  },
  deadlineErrorText: {
    color: 'red',
    [theme.breakpoints.down(768)]: {
      color: 'red',
      padding: 0,
      margin: 0,
    },
  },

  costBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '850px',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  rateContainer: {
    width: 'auto',
    margin: 0,
  },

  rateLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
  },

  rightMargin: {
    marginRight: '10px',
  },

  middleInput: {
    width: '80px',
  },

  rateTitle: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '140%',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },

  descriptionFieldWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    marginBottom: '20px',
    '& > span': {
      marginTop: '-20px',
    },
    [theme.breakpoints.down(768)]: {
      width: '280px',
    },
  },

  costSubBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  error: {
    color: 'red',
  },
  courseWrapper: {
    display: 'flex',
    alignSelf: 'flex-end',
    gap: 20,
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}))
