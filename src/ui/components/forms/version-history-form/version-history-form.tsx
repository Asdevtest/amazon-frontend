import { FC, UIEvent, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { ArrowBackIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Roles } from '@typings/enums/roles'
import { IPatchNote } from '@typings/shared/patch-notes'

import { useStyles } from './version-history-form.style'

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

  const { classes: styles, cx } = useStyles()

  const handleScrollPatchNotes = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 90) {
      onScrollPatchNotes()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {selectedPatchNote ? (
          <Button iconButton styleType={ButtonStyle.CASUAL} className={styles.back} onClick={onResetPatchNote}>
            <ArrowBackIcon />
          </Button>
        ) : null}
        <p className={cx(styles.title, styles.text)}>{selectedPatchNote ? selectedPatchNote?.[0]?.title : title}</p>
      </div>

      <div className={styles.versions} onScroll={handleScrollPatchNotes}>
        {selectedPatchNote ? (
          selectedPatchNote.map(patchNote => (
            <Field
              key={patchNote._id}
              disabled
              multiline
              labelClasses={cx(styles.title, styles.fixLabelMargin)}
              inputClasses={styles.editor}
              containerClasses={styles.editorContainer}
              label={Roles[patchNote.role]}
              value={patchNote.description}
            />
          ))
        ) : patchNotes.length > 0 ? (
          patchNotes.map(patchNote => (
            <button key={patchNote._id} className={styles.buttonVersion} onClick={() => onViewPatchNote(patchNote._id)}>
              <p className={styles.text}>{patchNote.title}</p>
            </button>
          ))
        ) : (
          <p className={styles.noData}>{t(TranslationKey['No data'])}</p>
        )}
      </div>

      <div className={styles.buttons}>
        <Button styleType={ButtonStyle.DANGER} onClick={onClickResetVersion}>
          {t(TranslationKey['Reset session data'])}
        </Button>
      </div>
    </div>
  )
})
