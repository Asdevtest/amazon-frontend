export const styles = theme => ({
  fieldsWrapper: {},
  alert: {
    marginTop: '24px',
    minHeight: '40px',

    // display: 'none',

    // maxHeight: 200,

    // backgroundColor: theme.palette.background.second,

    // color: theme.palette.text.second,

    // borderRadius: 4,
    // padding: 5,

    // backgroundColor: 'inherit',
  },

  alertMessage: {
    width: '430px',
    // height: 100,

    backgroundColor: 'inherit',
    border: 'none',
    resize: 'none',
    fontFamily: 'inherit',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
  },

  strategyLabel: {
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.palette.text.general,
    fontWeight: '600',
    marginBottom: '12px',
  },

  nativeSelect: {
    width: '300px',

    // backgroundColor: theme.palette.background.general,
    // color: theme.palette.text.general,
  },

  mainWrapper: {
    display: 'flex',

    backgroundColor: theme.palette.background.general,
  },

  leftBlockWrapper: {
    width: '500px',
  },

  rightBlockWrapper: {
    display: 'flex',
    marginLeft: '30px',
    justifyContent: 'space-between',
    width: '800px',
  },

  fieldsSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '380px',
  },

  shortInput: {
    width: '170px',
  },

  reasonTitleAlert: {
    fontSize: '14px',
    marginTop: '10px',
  },

  input: {
    overflow: 'hidden',

    border: `1px solid ${theme.palette.input.customBorder} `,

    color: theme.palette.text.general,
  },

  selectOption: {
    color: theme.palette.text.general,
  },
})
