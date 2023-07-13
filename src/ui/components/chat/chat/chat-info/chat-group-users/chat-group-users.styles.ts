import { makeStyles } from 'tss-react/mui'

export const useChatGroupUsersStyles = makeStyles()(theme => ({
  groupSettingsWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pencilEditIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  addMemberBtnWrapper: {
    display: 'flex',
  },

  addMemberBtnText: {
    color: '#fff',
    marginRight: 5,
  },

  membersWrapper: {
    marginTop: 30,
    width: '100%',
    height: 420,

    padding: '0 15px',

    overflow: 'auto',
  },

  avatarWrapper: {
    width: 30,
    height: 30,

    marginRight: 10,
  },

  memberWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  memberInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  opponentName: {
    maxWidth: 180,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  ownerSign: {
    color: theme.palette.text.second,
    marginLeft: 5,
  },

  arrowIcon: {
    // marginLeft: 8,
    color: theme.palette.primary.main,
  },
}))
