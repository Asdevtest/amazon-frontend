import {Box, Container, Link, Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {Field} from '@components/field/field'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './set-shipping-label-modal.style'

export const SetShippingLabelModal = ({onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel}) => {
  const {classes: classNames} = useClassNames()

  const shippingLabel =
    (item?.shippingLabel?.length > 200
      ? item?.shippingLabel.slice(0, 195) + '...' + item?.shippingLabel.slice(item?.shippingLabel.length - 3)
      : item?.shippingLabel) || ''

  const [files, setFiles] = useState(tmpShippingLabel?.length ? [...tmpShippingLabel] : [])

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Set Shipping Label'])}</Typography>

      {item?.shippingLabel && (
        <Box className={classNames.boxCode}>
          <Field
            label={t(TranslationKey['Shipping label'])}
            inputComponent={
              <div className={classNames.linkWrapper}>
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(item?.shippingLabel)}>
                  <Typography className={classNames.link}>{shippingLabel}</Typography>
                </Link>
                <CopyValue text={shippingLabel} />
              </div>
            }
          />
        </Box>
      )}

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />
      </div>

      <Box className={classNames.saveBox}>
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
      </Box>
    </Container>
  )
}
