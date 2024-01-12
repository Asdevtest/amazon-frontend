import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { Card } from '@components/modals/my-order-modal/components'
import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'
import { CopyValue } from '@components/shared/copy-value'
import { CustomTextEditor } from '@components/shared/custom-text-editor'

import { t } from '@utils/translations'

import { useStyles } from './comments-info.style'

interface CommentsInfoProps {
  isOrderEditable: boolean
  order: IOrderWithAdditionalFields
  setFormFields: SetFormFieldsType
  isClient?: boolean
}

interface IFieldConfig {
  field: string
  title: string
  text: string
  element?: JSX.Element
  isEditable?: boolean
}

export const CommentsInfo: FC<CommentsInfoProps> = memo(props => {
  const { isOrderEditable, isClient, order, setFormFields } = props

  const { classes: styles, cx } = useStyles()

  const initialState: IFieldConfig = {
    text: '',
    title: '',
    field: '',
    isEditable: false,
  }
  const [comment, setComment] = useState<IFieldConfig>(initialState)
  const [showCommentsModal, setShowCommentsModal] = useState(false)

  const handleChangeCommentState = (item: IFieldConfig) => {
    setComment(prevState => ({
      ...prevState,
      title: item.title,
      text: item.text,
      field: item.field,
      isEditable: item.isEditable,
    }))

    setShowCommentsModal(!showCommentsModal)
  }

  const commentsConfig: IFieldConfig[] = [
    {
      field: 'buyerComment',
      title: t(TranslationKey.Buyer),
      text: order?.buyerComment,
      element: order?.buyerComment.length > 0 ? <CopyValue text={order?.buyerComment} /> : undefined,
      isEditable: false,
    },
    {
      field: 'clientComment',
      title: t(TranslationKey.Client),
      text: order?.clientComment,
      element: order?.clientComment.length > 0 ? <CopyValue text={order?.clientComment} /> : undefined,
      isEditable: isClient,
    },
  ]

  const handleChangeComment = (fieldName: string) => (text: string) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      [fieldName]: text,
    }))
  }

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey.Comments)}</p>

        <div className={styles.cardsWrapper}>
          {commentsConfig.map((item, index) => {
            const showViewMoreButton = item.text || (isOrderEditable && item.isEditable)

            return (
              <Card key={index} wrapperClassName={cx(styles.card, styles.cardComment)}>
                <div className={styles.field}>
                  <p className={cx(styles.fieldText, styles.commentTitle)}>{item.title}</p>
                  {item.element}
                </div>

                {item.text ? (
                  <CustomTextEditor readOnly conditions={item.text} editorMaxHeight={styles.commentEditor} />
                ) : (
                  <p className={cx(styles.commentText, styles.empty)}>{t(TranslationKey.Empty)}</p>
                )}

                <div className={styles.buttonContainer}>
                  {showViewMoreButton && (
                    <button
                      className={cx(styles.commentText, styles.link)}
                      onClick={() => handleChangeCommentState(item)}
                    >
                      {t(TranslationKey['View more'])}
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
          readOnly={!(isOrderEditable && comment.isEditable)}
          title={comment.title}
          text={comment.text}
          isOpenModal={showCommentsModal}
          onOpenModal={() => setShowCommentsModal(!showCommentsModal)}
          onChangeField={handleChangeComment(comment.field)}
        />
      ) : null}
    </>
  )
})
