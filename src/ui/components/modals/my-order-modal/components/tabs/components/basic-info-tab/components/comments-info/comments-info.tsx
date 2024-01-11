import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CommentsModal } from '@components/modals/comments-modal'
import { Card } from '@components/modals/my-order-modal/components'
import { ChangeFieldFunction, IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { CopyValue } from '@components/shared/copy-value'
import { CustomTextEditor } from '@components/shared/custom-text-editor'

import { t } from '@utils/translations'

import { useStyles } from './comments-info.style'

interface CommentsInfoProps {
  isOrderEditable: boolean
  order: IOrderWithAdditionalFields
  onChangeField: ChangeFieldFunction
}

interface IFieldConfig {
  field: string
  title: string
  text: string
  element?: JSX.Element
}

export const CommentsInfo: FC<CommentsInfoProps> = memo(props => {
  const { isOrderEditable, order, onChangeField } = props

  const { classes: styles, cx } = useStyles()

  const initialState: IFieldConfig = {
    text: '',
    title: '',
    field: '',
  }
  const [comment, setComment] = useState<IFieldConfig>(initialState)
  const [showCommentsModal, setShowCommentsModal] = useState(false)

  const handleChangeComment = (item: IFieldConfig) => {
    setComment(prevState => ({
      ...prevState,
      title: item.title,
      text: item.text,
      field: item.field,
    }))

    setShowCommentsModal(!showCommentsModal)
  }

  const commentsConfig: IFieldConfig[] = [
    {
      field: 'buyerComment',
      title: t(TranslationKey.Buyer),
      text: order?.buyerComment,
      element: order?.buyerComment.length > 0 ? <CopyValue text={order?.buyerComment} /> : undefined,
    },
    {
      field: 'clientComment',
      title: t(TranslationKey.Client),
      text: order?.clientComment,
      element: order?.clientComment.length > 0 ? <CopyValue text={order?.clientComment} /> : undefined,
    },
  ]

  // TODO: кто и при каких ролях может оствить комменты?

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoBlock}>
          <p className={styles.title}>{t(TranslationKey.Comments)}</p>

          <div className={styles.cardsWrapper}>
            {commentsConfig.map((item, index) => (
              <Card key={index} wrapperClassName={cx(styles.card, styles.cardComment)}>
                <div className={styles.field}>
                  <p className={cx(styles.fieldText, styles.commentTitle)}>{item.title}</p>
                  {item.element}
                </div>

                {item.text ? (
                  <CustomTextEditor
                    readOnly
                    conditions={item.text}
                    editorMaxHeight={styles.commentEditor}
                    changeConditions={onChangeField}
                  />
                ) : (
                  <p className={cx(styles.commentText, styles.empty)}>{t(TranslationKey.Empty)}</p>
                )}

                <div className={styles.buttonContainer}>
                  {(item.text || isOrderEditable) && (
                    <button className={cx(styles.commentText, styles.link)} onClick={() => handleChangeComment(item)}>
                      {t(TranslationKey['View more'])}
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {showCommentsModal && (
        <CommentsModal
          readOnly={!isOrderEditable}
          title={comment.title}
          text={comment.text}
          isOpenModal={showCommentsModal}
          onOpenModal={() => setShowCommentsModal(!showCommentsModal)}
          onChangeField={onChangeField(comment.field)}
        />
      )}
    </>
  )
})
