import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './set-shipping-label-modal.style'

export const SetShippingLabelModal = ({ onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel }) => {
  const { classes: styles } = useStyles()
  const [files, setFiles] = useState(tmpShippingLabel?.length ? tmpShippingLabel : [])

  return (
    <div className={styles.modalWrapper}>
      <p className={styles.modalTitle}>{t(TranslationKey['Set Shipping Label'])}</p>

      {item?.shippingLabel && (
        <LabelWithCopy
          direction="column"
          labelTitleSize="medium"
          lableLinkTitleSize="medium"
          labelTitle={t(TranslationKey['Shipping label'])}
          labelValue={item?.shippingLabel}
          lableLinkTitle={t(TranslationKey.View)}
        />
      )}

      <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />

      <div className={styles.saveBox}>
        <Button
          disabled={!files.length && !tmpShippingLabel?.length}
          className={styles.actionButton}
          onClick={() => onClickSaveShippingLabel(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button className={styles.actionButton} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
