export const styles = theme => ({
  alert: {
    marginTop: '24px',
    minHeight: '40px',
  },

  alertMessage: {
    width: '430px',
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

  nativeSelect: {
    width: '300px',
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
