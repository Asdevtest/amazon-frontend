import { Box, Container, Link, Typography } from '@mui/material'

import React, { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './set-shipping-label-modal.style'

export const SetShippingLabelModal = ({ onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel }) => {
  const { classes: classNames } = useClassNames()

  const shippingLabel = getShortenStringIfLongerThanCount(item?.shippingLabel, 200, true) || ''

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
