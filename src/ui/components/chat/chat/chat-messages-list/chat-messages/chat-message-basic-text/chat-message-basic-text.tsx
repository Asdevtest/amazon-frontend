import he from 'he'
import { FC, memo } from 'react'
import Highlighter from 'react-highlight-words'
import Linkify from 'react-linkify-always-blank'

import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { ImagesTile } from '@components/chat/chat/chat-messages-list/chat-messages/images-tile/images-tile'
import { IsReadIcon, NoReadIcon } from '@components/shared/svg-icons'
import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'

import { useStyles } from './chat-message-basic-text.style'

import { ChatMessageBasicTextProps, HighlightTag } from './helpers/chat-message.type'
import { findChunks } from './helpers/find-chunks'

export const ChatMessageBasicText: FC<ChatMessageBasicTextProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { message, isIncomming, unReadMessage, isFound, searchPhrase, showName } = props

  const photoAndVideoFiles = message?.images?.concat(message?.video)
  const anotherFiles = message.files

  return (
    <div
      className={cx(
        styles.root,
        { [styles.rootIsIncomming]: isIncomming },
        { [styles.isFound]: isFound },
        { [styles.isFoundIncomming]: isFound && isIncomming },
      )}
    >
      <div className={styles.subWrapper}>
        {showName ? <UserLink name={message.user?.name} userId={message.user?._id} /> : null}

        {!!photoAndVideoFiles.length && !anotherFiles.length ? (
          <div className={styles.filesMainWrapper}>
            <ImagesTile images={photoAndVideoFiles} />
          </div>
        ) : null}

        {message.text && (
          <Highlighter
            autoEscape
            highlightClassName="YourHighlightClass"
            searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
            textToHighlight={he.decode(message.text)}
            className={styles.messageText}
            findChunks={findChunks}
            highlightTag={({ children }: HighlightTag) => (
              <Linkify>
                <span
                  className={cx({
                    [styles.highlight]: searchPhrase ? children?.toLowerCase().includes(searchPhrase) : false,
                  })}
                >
                  {children}
                </span>
              </Linkify>
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
        <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>

        {!isIncomming && unReadMessage ? (
          <NoReadIcon className={cx(styles.icon, styles.noReadIcon)} />
        ) : (
          <IsReadIcon className={cx(styles.icon, styles.isReadIcon)} />
        )}
      </div>
    </div>
  )
})
