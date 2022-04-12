import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: '#EBEBEB',
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '30px',
    flexDirection: 'row-reverse',
  },
  messageWrapperIsNextMessageSameAuthor: {
    marginBottom: '10px',
  },
  messageWrapperIsIncomming: {
    flexDirection: 'row',
  },
  messageWrapperIsLastMessage: {
    marginBottom: 0,
  },
  messageInner: {
    marginRight: '12px',
    maxWidth: '80%',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    overflow: 'hidden',
  },
  messageInnerIsIncomming: {
    marginRight: 0,
    marginLeft: '12px',
  },
  messageInnerIsNextMessageSameAuthor: {
    marginRight: '44px',
  },
  messageInnerIsNextMessageSameAuthorIsInclomming: {
    marginLeft: '44px',
  },
  messageAvatarWrapper: {
    height: '32px',
    width: '32px',
  },
  messageAvatarWrapperIsIncomming: {},

  timeText: {
    fontSize: '10px',
    textAlign: 'center',
  },

  linkText: {
    fontSize: '10px',
    textAlign: 'center',
    overflow: 'auto',
    maxHeight: '40px',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
  },
}))
