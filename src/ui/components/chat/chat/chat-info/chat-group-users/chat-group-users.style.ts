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
    alignItems: 'center',
    gap: 5,
  },

  addMemberBtnText: {
    color: '#fff',
  },

  membersWrapper: {
    padding: 10,
    overflowY: 'auto',
    maxHeight: 470,
    width: '100%',

    [theme.breakpoints.down(768)]: {
      maxHeight: 335,
    },
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

    [theme.breakpoints.down(768)]: {
      maxWidth: 160,
      fontSize: 14,
    },
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
