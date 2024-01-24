import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'

import { parseTextString } from '@utils/text'
import { t } from '@utils/translations'

import { CommentsInfoProps, IFieldConfig } from './comments-info.type'

export const useCommentsInfo = ({ formFields, setFormFields, isClient }: CommentsInfoProps) => {
  const initialState: IFieldConfig = {
    text: '',
    title: '',
    field: '',
    isEditable: false,
  }
  const [comment, setComment] = useState<IFieldConfig>(initialState)
  const [showCommentsModal, setShowCommentsModal] = useState(false)

  const handleToggleCommentsModal = () => setShowCommentsModal(!showCommentsModal)

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

  const handleChangeComment = (fieldName: string) => (text: string) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      [fieldName]: text,
    }))
  }

  const commentsConfig: IFieldConfig[] = [
    {
      field: 'buyerComment',
      title: t(TranslationKey.Buyer),
      text: parseTextString(formFields?.buyerComment),
      element:
        formFields?.buyerComment?.length > 0 ? (
          <CopyValue text={parseTextString(formFields?.buyerComment)} />
        ) : undefined,
      isEditable: false,
    },
    {
      field: 'clientComment',
      title: t(TranslationKey.Client),
      text: parseTextString(formFields?.clientComment),
      element:
        formFields?.clientComment?.length > 0 ? (
          <CopyValue text={parseTextString(formFields?.clientComment)} />
        ) : undefined,
      isEditable: isClient,
    },
  ]

  return {
    comment,
    commentsConfig,
    onChangeComment: handleChangeComment,
    onChangeCommentState: handleChangeCommentState,
    showCommentsModal,
    oToggleCommentsModal: handleToggleCommentsModal,
  }
}
