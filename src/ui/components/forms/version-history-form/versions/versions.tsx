import { FC, UIEvent, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IPatchNote } from '@typings/shared/patch-notes'

import { useStyles } from './versions.style'

interface VersionsProps {
  patchNotes: IPatchNote[]
  onScrollPatchNotes: (e: UIEvent<HTMLElement>) => void
  onViewPatchNote: (patchNoteId: string) => void
}

export const Versions: FC<VersionsProps> = memo(({ patchNotes, onScrollPatchNotes, onViewPatchNote }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper} onScroll={onScrollPatchNotes}>
      {patchNotes.length > 0 ? (
        patchNotes.map(patchNote => (
          <button key={patchNote._id} className={styles.buttonVersion} onClick={() => onViewPatchNote(patchNote._id)}>
            <p className={styles.text}>{patchNote.title}</p>
          </button>
        ))
      ) : (
        <p className={styles.noData}>{t(TranslationKey['No data'])}</p>
      )}
    </div>
  )
})
