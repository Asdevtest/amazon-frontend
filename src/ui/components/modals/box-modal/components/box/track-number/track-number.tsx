import { ChangeEvent, FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './track-number.style'

interface TrackNumberProps {
  isClient: boolean
  isEdit: boolean
  formFields?: IBox
  onChangeField: (field: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTrackNumberFile: (files: string[]) => void
}

export const TrackNumber: FC<TrackNumberProps> = memo(props => {
  const { isClient, isEdit, formFields, onChangeField, onChangeTrackNumberFile } = props

  const { classes: styles, cx } = useStyles()
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

  return (
    <>
      {!isClient ? (
        <div className={styles.wrapper}>
          <div className={styles.trackNumber}>
            <Field
              disabled={!isEdit}
              placeholder={t(TranslationKey['Not available'])}
              classes={{ input: styles.input }}
              inputClasses={styles.inputClasses}
              containerClasses={styles.field}
              labelClasses={cx(styles.text, styles.label)}
              inputProps={{ maxLength: 250 }}
              label={t(TranslationKey['Track number'])}
              value={formFields?.trackNumberText || ''}
              onChange={onChangeField('trackNumberText')}
            />

            <Button disabled={!isEdit} onClick={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
              {formFields?.trackNumberFile?.length ? t(TranslationKey['File added']) : t(TranslationKey['Add file'])}
            </Button>
          </div>

          <div className={styles.trackNumberPhoto}>
            {formFields?.trackNumberFile?.length ? (
              <SlideshowGallery hiddenPreviews slidesToShow={1} files={formFields?.trackNumberFile} />
            ) : (
              <p className={styles.text}>{`${t(TranslationKey['no photo track number'])}...`}</p>
            )}
          </div>
        </div>
      ) : null}

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
        <SetBarcodeModal
          title={t(TranslationKey['Track number'])}
          maxNumber={50}
          tmpCode={formFields?.trackNumberFile || []}
          onClickSaveBarcode={onChangeTrackNumberFile}
          onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
        />
      </Modal>
    </>
  )
})
