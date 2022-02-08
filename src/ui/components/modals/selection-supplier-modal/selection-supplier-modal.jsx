import React, {useState} from 'react'

import {Container, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './selection-supplier-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').selectionSupplierModal

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const SelectionSupplierModal = ({product, onCloseModal, onTriggerOpenModal, onSubmitSeekSupplier}) => {
  const [selectedSendRequestButton, setSelectedSendRequestButton] = useState(false)
  const [selectedAddSupplierButton, setSelectedAddSupplierButton] = useState(false)
  const [selectedButtonValue, setSelectedButtonValue] = useState('')
  const [clickNextOrPrevButton, setClickNextOrPrevButton] = useState(false)

  const [comment, setComment] = useState('')

  const classNames = useClassNames()

  const buttonSendRequestClsx = clsx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedSendRequestButton,
  })
  const buttonAddSupplierClsx = clsx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedAddSupplierButton,
  })
  const modalTitleClsx = clsx(classNames.modalTitle, {[classNames.modalTitleChange]: clickNextOrPrevButton})

  const selectedButtonValueConfig = {
    ADD_NEW_SUPPLIER: 'ADD_NEW_SUPPLIER',
    SEND_REQUEST: 'SEND_REQUEST',
  }

  const onClickSendRequestButton = () => {
    setSelectedSendRequestButton(!selectedSendRequestButton)
    setSelectedAddSupplierButton(false)
    setSelectedButtonValue(selectedButtonValueConfig.SEND_REQUEST)
  }

  const onClickAddSupplierButton = () => {
    setSelectedAddSupplierButton(!selectedAddSupplierButton)
    setSelectedSendRequestButton(false)
    setSelectedButtonValue(selectedButtonValueConfig.ADD_NEW_SUPPLIER)
  }

  const onClickNextButton = () => {
    if (selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST) {
      setClickNextOrPrevButton(true)

      if (clickNextOrPrevButton) {
        onSubmitSeekSupplier(comment)
      }
    }

    if (selectedButtonValue === selectedButtonValueConfig.ADD_NEW_SUPPLIER) {
      setClickNextOrPrevButton(false)
      onCloseModal()
      onTriggerOpenModal()
    }
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={modalTitleClsx}>{textConsts.modalTitle}</Typography>

      {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
        <div>
          <Typography className={classNames.modalSubTitle}>{textConsts.modalSubTitle}</Typography>
          <Field
            multiline
            minRows={4}
            rowsMax={4}
            value={comment}
            placeholder={textConsts.modalPlaceholder}
            className={classNames.modalTextArea}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      ) : (
        <div className={classNames.modalButtonsWrapper}>
          <Button
            tooltipContent={textConsts.searchSupplierTooltip}
            disabled={
              product &&
              (product?.originalData.status < ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT] ||
                !clientToEditStatuses.includes(product?.originalData.status))
            }
            className={buttonSendRequestClsx}
            onClick={() => onClickSendRequestButton()}
          >
            {textConsts.sendRequest}
          </Button>

          <Button
            tooltipContent={textConsts.newSupplierTooltip}
            disabled={product && !clientToEditStatuses.includes(product?.originalData.status)}
            className={buttonAddSupplierClsx}
            onClick={() => onClickAddSupplierButton()}
          >
            {textConsts.addNewSupplier}
          </Button>
        </div>
      )}

      <Grid container spacing={2} className={classNames.modalButtonWrapper}>
        {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
          <Grid item>
            <Button className={classNames.modalButtonBack} onClick={() => setClickNextOrPrevButton(false)}>
              {textConsts.backBtn}
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Button className={classNames.modalButtonBack} onClick={() => onCloseModal()}>
              {textConsts.skipBtn}
            </Button>
          </Grid>
        )}

        <Grid item>
          <Button
            success
            tooltipContent={clickNextOrPrevButton && textConsts.seekSupplierTooltip}
            disabled={!selectedButtonValue}
            className={classNames.modalButtonNext}
            onClick={() => onClickNextButton()}
          >
            {textConsts.nextBtn}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
