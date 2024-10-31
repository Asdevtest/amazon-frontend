import { FC, UIEvent, memo } from 'react'

import { appVersion } from '@constants/app-version'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { ArrowBackIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { IPatchNote } from '@typings/shared/patch-notes'

import { useStyles } from './version-history-form.style'

import { SelectedPatchNote } from './selected-patch-note'
import { Versions } from './versions'

interface VersionHistoryFormProps {
  title: string
  patchNotes: IPatchNote[]
  onScrollPatchNotes: () => void
  onResetPatchNote: () => void
  onViewPatchNote: (patchNoteId: string) => void
  onClickResetVersion: () => void
  selectedPatchNote?: IPatchNote[]
}

export const VersionHistoryForm: FC<VersionHistoryFormProps> = memo(props => {
  const {
    title,
    patchNotes,
    onScrollPatchNotes,
    onResetPatchNote,
    onViewPatchNote,
    onClickResetVersion,
    selectedPatchNote,
  } = props

  const { classes: styles } = useStyles()

  const handleScrollPatchNotes = (e: UIEvent<HTMLElement>) => {
    if (selectedPatchNote) {
      return
    }

    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 90 && patchNotes.length >= 10) {
      onScrollPatchNotes()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {selectedPatchNote ? (
          <CustomButton icon={<ArrowBackIcon />} className={styles.back} onClick={onResetPatchNote}></CustomButton>
        ) : null}
        <p className={styles.title}>{selectedPatchNote ? selectedPatchNote?.[0]?.title : title}</p>
        {!selectedPatchNote ? <p className={styles.appVersion}>{appVersion}</p> : null}
      </div>

      {selectedPatchNote ? (
        <SelectedPatchNote selectedPatchNote={selectedPatchNote} />
      ) : (
        <Versions
          patchNotes={patchNotes}
          onScrollPatchNotes={handleScrollPatchNotes}
          onViewPatchNote={onViewPatchNote}
        />
      )}

      <div className={styles.buttons}>
        <CustomButton danger type="primary" onClick={onClickResetVersion}>
          {t(TranslationKey['Reset session data'])}
        </CustomButton>
      </div>
    </div>
  )
})
