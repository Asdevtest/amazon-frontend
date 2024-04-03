import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './comments.style'

interface CommentsProps {
  formFields: IBox
  isClient: boolean
  isStorekeeper: boolean
  onChangeField: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void
  onSubmitChangeFields?: (fields: IBox) => void
}

export const Comments: FC<CommentsProps> = memo(props => {
  const { formFields, isClient, isStorekeeper, onChangeField, onSubmitChangeFields } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Field
        multiline
        disabled={!isClient || !onSubmitChangeFields}
        minRows={4}
        maxRows={4}
        label={t(TranslationKey['Client comment'])}
        placeholder={isClient && onSubmitChangeFields ? t(TranslationKey['Add comment']) : ''}
        className={styles.commentField}
        labelClasses={styles.label}
        containerClasses={styles.commentFieldContainer}
        value={formFields?.clientComment || ''}
        onChange={onChangeField('clientComment')}
      />

      <Field
        multiline
        disabled={!isStorekeeper || !onSubmitChangeFields}
        minRows={4}
        maxRows={4}
        label={t(TranslationKey['Storekeeper comment'])}
        placeholder={isStorekeeper && onSubmitChangeFields ? t(TranslationKey['Add comment']) : ''}
        className={styles.commentField}
        labelClasses={styles.label}
        value={formFields?.storekeeperComment || ''}
        containerClasses={styles.commentFieldContainer}
        onChange={onChangeField('storekeeperComment')}
      />
    </div>
  )
})
