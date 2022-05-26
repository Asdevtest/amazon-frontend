import React, {useState} from 'react'

import {Container, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './selection-supplier-modal.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const SelectionSupplierModal = ({
  product,
  onCloseModal,
  onClickFinalAddSupplierButton,
  onSubmitSeekSupplier,
}) => {
  const [selectedSendRequestButton, setSelectedSendRequestButton] = useState(false)
  const [selectedAddSupplierButton, setSelectedAddSupplierButton] = useState(false)
  const [selectedButtonValue, setSelectedButtonValue] = useState('')
  const [clickNextOrPrevButton, setClickNextOrPrevButton] = useState(false)

  const [comment, setComment] = useState(product?.originalData.clientComment || '')

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
      onClickFinalAddSupplierButton()
    }
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={modalTitleClsx}>{t(TranslationKey['Select a supplier'])}</Typography>

      {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
        <div>
          <Field
            multiline
            label={t(TranslationKey['Update product comment:'])}
            minRows={4}
            rowsMax={4}
            value={comment}
            placeholder={t(TranslationKey.Comment) + '...'}
            className={classNames.modalTextArea}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      ) : (
        <div className={classNames.modalButtonsWrapper}>
          <Button
            tooltipContent={t(TranslationKey['Paid service'])}
            disabled={product && !clientToEditStatuses.includes(product?.originalData.status)}
            className={buttonSendRequestClsx}
            onClick={() => onClickSendRequestButton()}
          >
            {t(TranslationKey['Send request for supplier search'])}
          </Button>

          <Button
            tooltipContent={t(TranslationKey['Free service'])}
            disabled={product && !clientToEditStatuses.includes(product?.originalData.status)}
            className={buttonAddSupplierClsx}
            onClick={() => onClickAddSupplierButton()}
          >
            {t(TranslationKey['Add a new supplier'])}
          </Button>
        </div>
      )}

      <Grid container spacing={2} className={classNames.modalButtonWrapper}>
        {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
          <Grid item>
            <Button className={classNames.modalButtonBack} onClick={() => setClickNextOrPrevButton(false)}>
              {t(TranslationKey.Back)}
            </Button>
          </Grid>
        ) : null}

        <Grid item>
          <Button
            success
            tooltipContent={
              clickNextOrPrevButton && t(TranslationKey['Click next to calculate the cost of your supplier search'])
            }
            disabled={!selectedButtonValue}
            className={classNames.modalButtonNext}
            onClick={() => onClickNextButton()}
          >
            {t(TranslationKey.Next)}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
