import { useState } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './set-shipping-label-modal.style'

export const SetShippingLabelModal = ({ onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel }) => {
  const { classes: classNames } = useClassNames()
  const [files, setFiles] = useState(tmpShippingLabel?.length ? [...tmpShippingLabel] : [])

  const shippingLabel = getShortenStringIfLongerThanCount(item?.shippingLabel, 200, true) || ''

  return (
    <div className={classNames.modalWrapper}>
      <p className={classNames.modalTitle}>{t(TranslationKey['Set Shipping Label'])}</p>

      {item?.shippingLabel && (
        <Field
          label={t(TranslationKey['Shipping label'])}
          inputComponent={
            <div className={classNames.linkWrapper}>
              <Tooltip arrow title={shippingLabel}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={checkAndMakeAbsoluteUrl(item?.shippingLabel)}
                  className={classNames.link}
                >
                  {shippingLabel}
                </a>
              </Tooltip>

              <CopyValue text={shippingLabel} />
            </div>
          }
        />
      )}

      <div className={classNames.uploadInput}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />
      </div>

      <div className={classNames.saveBox}>
        <Button
          disabled={!files.length && !tmpShippingLabel?.length}
          className={classNames.actionButton}
          onClick={() => onClickSaveShippingLabel(files)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button className={classNames.actionButton} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
