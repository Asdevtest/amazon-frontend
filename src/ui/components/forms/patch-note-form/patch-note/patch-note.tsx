import { FC, memo } from 'react'

import { MenuItem, Select } from '@mui/material'

import { MIDDLE_COMMENT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomAutoComplete } from '@components/shared/custom-autocomplete'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { IPatchNoteToCreate } from '@views/shared/patch-noutes-view/patch-noutes-view.type'

import { t } from '@utils/translations'

import { useStyles } from './patch-note.style'

import { UserRolesForPatchNote } from '../patch-note-form.constants'
import { EventType } from '../patch-note-form.type'

interface PatchNoteProps {
  error: boolean
  patchNote: IPatchNoteToCreate
  patchNoteIndex: number
  patchNotesRoles: string[]
  patchNoteVersions: string[]
  onRemovePatchNote: (patchNoteIndex: number) => void
  onChangePatchNote: (patchNoteIndex: number, field: string) => (e: EventType) => void
  onChangePatchNoteDescription: (patchNoteIndex: number) => (value: string) => void
}

export const PatchNote: FC<PatchNoteProps> = memo(props => {
  const {
    error,
    patchNote,
    patchNoteIndex,
    patchNotesRoles,
    patchNoteVersions,
    onRemovePatchNote,
    onChangePatchNote,
    onChangePatchNoteDescription,
  } = props

  const { classes: styles, cx } = useStyles()

  const isNotFirstPatchNote = patchNoteIndex > 0

  const versionOptions = patchNoteVersions.map(version => ({
    value: version,
    label: version,
  }))

  return (
    <div className={cx(styles.wrapper)}>
      {isNotFirstPatchNote ? (
        <div className={styles.lineContainer}>
          <div className={styles.line} />
          <button className={styles.crossButton} onClick={() => onRemovePatchNote(patchNoteIndex)}>
            ✕
          </button>
        </div>
      ) : null}

      {!isNotFirstPatchNote ? (
        <>
          <Field
            label={t(TranslationKey.Title)}
            placeholder={t(TranslationKey.Title)}
            value={patchNote.title}
            error={error}
            maxLength={MIDDLE_COMMENT_VALUE}
            labelClasses={styles.fieldLabel}
            containerClasses={styles.fieldContainer}
            onChange={onChangePatchNote(patchNoteIndex, 'title')}
          />

          <CustomAutoComplete
            fullWidth
            label="Version"
            placeholder="Version"
            maxLength={64}
            labelClassName={styles.fieldLabel}
            rootClassName={styles.versionField}
            options={versionOptions}
            value={patchNote.version}
            onChange={onChangePatchNote(patchNoteIndex, 'version')}
          />
        </>
      ) : null}

      <Field
        label={t(TranslationKey.Role)}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        inputComponent={
          <Select
            displayEmpty
            // @ts-ignore
            value={patchNote.role}
            renderValue={() => UserRolesForPatchNote[patchNote.role] || t(TranslationKey.Role)}
            input={<Input fullWidth classes={{ input: patchNote.role.length === 0 ? styles.emptySelectValue : '' }} />}
            onChange={onChangePatchNote(patchNoteIndex, 'role')}
          >
            {Object.entries(UserRolesForPatchNote)
              .filter(([key, _]) => !patchNotesRoles.includes(key))
              .map(([key, value]) => (
                <MenuItem key={value} value={key}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        }
      />

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
