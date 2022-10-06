import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '700px',
  },

  button: {
    marginLeft: '10px',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  allowUrlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  urlInputWrapper: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  httpMethodSelect: {
    height: '65px',
    width: '95px',
  },

  urlInput: {
    overflowY: 'auto',
    whiteSpace: 'wrap',
    height: '65px',
    marginRight: '20px',
    width: '450px',
  },

  form: {
    marginTop: '20px',
    width: '700px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  nameDeliveryWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  longContainer: {
    width: '330px',
  },

  blockWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  fieldLabel: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#354256',
  },

  blockItem: {
    width: '200px',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  costBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between',
  },

  rateContainer: {
    width: 'auto',
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
    color: '#001029',
  },

  descriptionFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    marginBottom: '20px',
    '& > span': {
      marginTop: '-20px',
    },
  },

  error: {
    color: 'red',
  },
  courseWrapper: {
    display: 'flex',
    gap: 10,
  },

  '@media (max-width: 768px)': {
    form: {
      width: '280px',
    },
    root: {
      minWidth: 0,
      width: '280px',
      margin: '0 -10px',
    },
    modalTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
    },
    nameDeliveryWrapper: {
      width: '280px',
      flexDirection: 'column',
    },
    longContainer: {
      width: '280px',
    },
    fieldLabel: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
    courseWrapper: {
      display: 'none',
    },
    costBlock: {
      width: '280px',
    },

    blockWrapper: {
      width: '280px',
      flexDirection: 'column',

      alignItems: 'flex-start',
    },

    blockItem: {
      width: '280px',
    },
    deadlineError: {
      borderBottom: 'none',
    },
    deadlineErrorText: {
      color: 'red',
      padding: 0,
      margin: 0,
    },
    modalSubTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
    },
    rateTitle: {
      fontSize: '16px',
      lineHeight: '22px',
      color: '#001029',
      fontWeight: 600,
    },
    descriptionFieldWrapper: {
      width: '280px',
    },
    btnsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))
