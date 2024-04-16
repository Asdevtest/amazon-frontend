import { FC, memo } from 'react'

import { MenuItem, Select } from '@mui/material'

import { UserRolePrettyMap } from '@constants/keys/user-roles'
import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { IPatchNoteToCreate } from '@views/shared/patch-noutes-view/patch-noutes-view.type'

import { t } from '@utils/translations'

import { useStyles } from './patch-note.style'

import { EventType } from '../patch-note-form.type'

interface PatchNoteProps {
  patchNote: IPatchNoteToCreate
  patchNoteIndex: number
  onChangePatchNote: (patchNoteIndex: number, field: string) => (e: EventType) => void
}

export const PatchNote: FC<PatchNoteProps> = memo(props => {
  const { patchNote, patchNoteIndex, onChangePatchNote } = props

  const { classes: styles, cx } = useStyles()

  const isEmptyRole = patchNote.role.length === 0
  const isNotFirstPatchNote = patchNoteIndex > 0

  return (
    <div className={cx(styles.wrapper, { [styles.emptySelectValue]: isEmptyRole })}>
      <div className={cx(styles.line, { [styles.showLine]: isNotFirstPatchNote })} />

      <Field
        label={t(TranslationKey.Title)}
        placeholder={t(TranslationKey.Title)}
        value={patchNote.title}
        maxLength={MIDDLE_COMMENT_VALUE}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        onChange={onChangePatchNote(patchNoteIndex, 'title')}
      />

      <Field
        label={t(TranslationKey.Role)}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        inputComponent={
          <Select
            displayEmpty
            // @ts-ignore
            value={patchNote.role}
            input={<Input fullWidth />}
            onChange={onChangePatchNote(patchNoteIndex, 'role')}
          >
            <MenuItem disabled value="">
              {t(TranslationKey.Role)}
            </MenuItem>
            {Object.entries(UserRolePrettyMap).map(([key, value]) => (
              <MenuItem key={value} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        }
      />

      <Field
        multiline
        label={t(TranslationKey.Description)}
        placeholder={t(TranslationKey.Description)}
        minRows={5}
        maxRows={5}
        value={patchNote.description}
        labelClasses={styles.fieldLabel}
        inputClasses={styles.field}
        containerClasses={styles.fieldContainer}
        onChange={onChangePatchNote(patchNoteIndex, 'description')}
      />
    </div>
  )
})
