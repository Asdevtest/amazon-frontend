export const styles = theme => ({
  mainWrapper: {
    padding: '20px 45px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  fieldLabel: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  selectorWrapper: {
    marginLeft: 20,
  },

  selectorMainWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  noticeAttention: {
    color: 'red',
    marginLeft: 42,
  },

  noticesWrapper: {
    display: 'flex',

    gap: 23,
  },

  noticesPaper: {
    padding: '30px 40px',
  },

  technicalWorkNoticeWrapper: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    width: 722,
  },

  technicalWorkNoticeAttention: {
    color: theme.palette.text.general,

    fontSize: 16,
    fontWeight: 600,
  },

  technicalWorkNoticeText: {
    whiteSpace: 'pre',
    textAlign: 'center',
    margin: '13px 0 50px',
  },

  usersNoticeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

    width: 600,
  },

  usersNoticeInput: {
    height: 'auto',
    width: '100%',
    marginBottom: 40,
  },
})
