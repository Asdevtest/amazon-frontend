import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { Card } from '@components/modals/my-order-modal/components'
import { Field } from '@components/shared/field'
import { PencilIcon, TooltipAttention } from '@components/shared/svg-icons'

import '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './comments-info.style'

import { CommentsInfoProps } from './comments-info.type'
import { useCommentsInfo } from './use-comments-info'

export const CommentsInfo: FC<CommentsInfoProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { comment, commentsConfig, onChangeComment, onChangeCommentState, showCommentsModal, oToggleCommentsModal } =
    useCommentsInfo(props)

  const showTooltipAttention = (props.formFields?.buyerComment || props.formFields?.clientComment)?.length > 0

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{t(TranslationKey.Comments)}</p>
          {showTooltipAttention ? <TooltipAttention className={styles.titleIcon} /> : null}
        </div>

        <div className={styles.cardsWrapper}>
          {commentsConfig.map((item, index) => {
            const showViewMoreButton = item.text || (props.isOrderEditable && item.isEditable)
            const showPencilIcon = props.isOrderEditable && item.isEditable

            return (
              <Card key={index} wrapperClassName={styles.commentCard}>
                <div className={styles.field}>
                  <p className={cx(styles.fieldText, styles.commentTitle)}>{item.title}</p>
                  {item.element}
                </div>

                {item.text ? (
                  <Field
                    multiline
                    disabled
                    containerClasses={styles.editorWrapper}
                    inputClasses={styles.editor}
                    minRows={3}
                    maxRows={3}
                    value={item.text}
                  />
                ) : (
                  <p className={cx(styles.commentText, styles.empty)}>{t(TranslationKey.Empty)}</p>
                )}

                <div className={styles.buttonContainer}>
                  {showViewMoreButton && (
                    <button
                      className={cx(styles.button, styles.commentText, styles.link)}
                      onClick={() => onChangeCommentState(item)}
                    >
                      {t(TranslationKey['View more'])}
                      {showPencilIcon ? <PencilIcon className={styles.pencilIcon} /> : null}
                    </button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {showCommentsModal ? (
        <CommentsModal
          readOnly={!(props.isOrderEditable && comment.isEditable)}
          title={comment.title}
          text={comment.text}
          openModal={showCommentsModal}
          onOpenModal={oToggleCommentsModal}
          onChangeField={onChangeComment(comment.field)}
        />
      ) : null}
    </>
  )
})
