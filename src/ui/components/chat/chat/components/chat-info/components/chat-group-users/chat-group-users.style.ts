import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  membersWrapper: {
    padding: 10,
    overflowY: 'auto',
    width: '100%',
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
}))
