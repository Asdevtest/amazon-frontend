import React, {useState} from 'react'

import {Box, Container, Divider, Link, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {UploadFilesInput} from '@components/upload-files-input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './set-shipping-label-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').ordersViewsModalSetShippingLabel

export const SetShippingLabelModal = ({onClickSaveShippingLabel, onCloseModal, item, tmpShippingLabel}) => {
  const classNames = useClassNames()

  const shippingLabel = item?.shippingLabel

  const [files, setFiles] = useState(tmpShippingLabel?.length ? [...tmpShippingLabel] : [])

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.title}</Typography>
      <Divider className={classNames.divider} />

      {item?.shippingLabel && (
        <Box className={classNames.boxCode}>
          <Typography className={(classNames.modalText, classNames.typoCode)}>{textConsts.code}</Typography>

          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(shippingLabel)}>
            <Typography className={classNames.link}>{shippingLabel}</Typography>
          </Link>
        </Box>
      )}

      <div className={classNames.imageFileInputWrapper}>
        <UploadFilesInput images={files} setImages={setFiles} maxNumber={1} />
      </div>

      <Divider className={classNames.divider} />
      <Box className={classNames.saveBox}>
        <Button
          disabled={!files.length}
          className={classNames.saveBtn}
          onClick={() => onClickSaveShippingLabel([files[0]])}
        >
          {textConsts.saveBtn}
        </Button>
        <Button onClick={onCloseModal}>{textConsts.closeBtn}</Button>
      </Box>
    </Container>
  )
}
