import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'

import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'
import { IPatchNote } from '@typings/shared/patch-notes'

import { useStyles } from './selected-patch-note.style'

interface SelectedPatchNoteProps {
  selectedPatchNote: IPatchNote[]
}

export const SelectedPatchNote: FC<SelectedPatchNoteProps> = memo(({ selectedPatchNote }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {selectedPatchNote.map(patchNote => (
        <div key={patchNote._id} className={styles.patchNote}>
          <p className={styles.title}>{Roles[patchNote.role]}</p>
          <CustomTextEditor
            readOnly
            allHeight
            value={patchNote.description}
            placeholder={t(TranslationKey.Description)}
            editorWrapperClassName={styles.editorContainer}
          />
        </div>
      ))}
    </div>
  )
})
