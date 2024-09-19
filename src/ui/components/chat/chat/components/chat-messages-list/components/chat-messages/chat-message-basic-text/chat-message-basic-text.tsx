import { Avatar } from 'antd'
import he from 'he'
import { FC, memo } from 'react'
import Highlighter from 'react-highlight-words'

import { TranslationKey } from '@constants/translations/translation-key'

import { IsReadIcon, NoReadIcon } from '@components/shared/svg-icons'
import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutesLocal } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './chat-message-basic-text.style'

import { ChatMessageFiles } from '../chat-message-files/chat-message-files'
import { ImagesTile } from '../images-tile/images-tile'

import { ChatMessageBasicTextProps, HighlightTag } from './helpers/chat-message.type'
import { findChunks } from './helpers/find-chunks'

export const ChatMessageBasicText: FC<ChatMessageBasicTextProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { message, isIncomming, unReadMessage, isFound, searchPhrase, showName } = props

  const photoAndVideoFiles = message?.images?.concat(message?.video)
  const anotherFiles = message.files
  const forwardedMessage = message?.forwardedMessage

  return (
    <div
      className={cx(styles.root, { [styles.isFound]: isFound }, { [styles.isFoundIncomming]: isFound && isIncomming })}
    >
      <div className={styles.subWrapper}>
        {forwardedMessage ? (
          <div className={styles.forwardedMessage}>
            <p className={styles.forwardedMessageTitle}>{t(TranslationKey['Forwarded from' as TranslationKey])}</p>
            <Avatar size={24} src={getUserAvatarSrc(forwardedMessage.user?._id)} />
            <p className={styles.forwardedMessageName}>{forwardedMessage.user?.name}</p>
          </div>
        ) : null}

        {showName ? <UserLink name={message.user?.name} userId={message.user?._id} /> : null}

        {!!photoAndVideoFiles.length && !anotherFiles.length ? (
          <div className={styles.filesMainWrapper}>
            <ImagesTile images={photoAndVideoFiles} />
          </div>
        ) : null}

        {!!message.text && (
          <Highlighter
            autoEscape
            highlightClassName="YourHighlightClass"
            searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
            textToHighlight={he.decode(message.text)}
            className={styles.messageText}
            findChunks={findChunks}
            highlightTag={({ children }: HighlightTag) => (
              <span
                className={cx({
                  [styles.highlight]: searchPhrase ? children?.toLowerCase().includes(searchPhrase) : false,
                })}
              >
                {children}
              </span>
            )}
          />
        )}

        {anotherFiles.length > 0 ? (
          <div className={styles.filesMainWrapper}>
            <ChatMessageFiles files={anotherFiles} />
          </div>
        ) : null}
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.timeText}>{formatDateTimeHourAndMinutesLocal(message.createdAt)}</p>

        {!isIncomming && unReadMessage ? (
          <NoReadIcon className={cx(styles.icon, styles.noReadIcon)} />
        ) : (
          <IsReadIcon className={cx(styles.icon, styles.isReadIcon)} />
        )}
      </div>
    </div>
  )
})
