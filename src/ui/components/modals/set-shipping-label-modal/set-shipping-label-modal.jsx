import { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './set-shipping-label-modal.style'

export const SetShippingLabelModal = props => {
  const { onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel } = props

  const { classes: styles } = useStyles()
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (tmpShippingLabel.length > 0) {
      setFiles(tmpShippingLabel)
    }
  }, [tmpShippingLabel])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Set Shipping Label'])}</p>

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

      <div className={styles.buttons}>
        <Button
          styleType={ButtonStyle.SUCCESS}
          disabled={!files.length && !tmpShippingLabel?.length}
          onClick={() => onClickSaveShippingLabel(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
