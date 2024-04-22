import { FC, memo } from 'react'

import { MenuItem, Select } from '@mui/material'

import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { IPatchNoteToCreate } from '@views/shared/patch-noutes-view/patch-noutes-view.type'

import { t } from '@utils/translations'

import { useStyles } from './patch-note.style'

import { EventType } from '../patch-note-form.type'

import { UserRolesForPatchNote } from './patch-note.constants'

interface PatchNoteProps {
  patchNote: IPatchNoteToCreate
  patchNoteIndex: number
  patchNoteVersions: string[]
  onChangePatchNote: (patchNoteIndex: number, field: string) => (e: EventType) => void
  onChangePatchNoteDescription: (patchNoteIndex: number) => (value: string) => void
}

export const PatchNote: FC<PatchNoteProps> = memo(props => {
  const { patchNote, patchNoteIndex, /* patchNoteVersions, */ onChangePatchNote, onChangePatchNoteDescription } = props

  const { classes: styles, cx } = useStyles()

  const isNotFirstPatchNote = patchNoteIndex > 0

  return (
    <div className={cx(styles.wrapper)}>
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
        label={t(TranslationKey.Version)}
        placeholder={t(TranslationKey.Version)}
        value={patchNote.version}
        maxLength={64}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        onChange={onChangePatchNote(patchNoteIndex, 'version')}
      />

      {/* <Field
        label={t(TranslationKey.Version)}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        inputComponent={
          <Select
            displayEmpty
            // @ts-ignore
            value={patchNote.version}
            input={
              <Input fullWidth classes={{ input: patchNote.version.length === 0 ? styles.emptySelectValue : '' }} />
            }
            onChange={onChangePatchNote(patchNoteIndex, 'version')}
          >
            <MenuItem disabled value="">
              {t(TranslationKey.Version)}
            </MenuItem>
            {patchNoteVersions.map((version, index) => (
              <MenuItem key={index} value={version}>
                {version}
              </MenuItem>
            ))}
          </Select>
        }
      /> */}

      <Field
        label={t(TranslationKey.Role)}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        inputComponent={
          <Select
            displayEmpty
            // @ts-ignore
            value={patchNote.role}
            input={<Input fullWidth classes={{ input: patchNote.role.length === 0 ? styles.emptySelectValue : '' }} />}
            onChange={onChangePatchNote(patchNoteIndex, 'role')}
          >
            <MenuItem disabled value="">
              {t(TranslationKey.Role)}
            </MenuItem>
            {Object.entries(UserRolesForPatchNote).map(([key, value]) => (
              <MenuItem key={value} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        }
      />

      {/* <Field
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
      /> */}

      <CustomTextEditor
        title={t(TranslationKey.Description)}
        placeholder={t(TranslationKey.Description)}
        value={patchNote.description}
        editorClassName={styles.editor}
        editorWrapperClassName={styles.fieldContainer}
        editorContainerClassName={styles.editor}
        onChange={onChangePatchNoteDescription(patchNoteIndex)}
      />
    </div>
  )
})
