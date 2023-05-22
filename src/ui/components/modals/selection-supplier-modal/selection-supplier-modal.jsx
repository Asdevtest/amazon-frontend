import { cx } from '@emotion/css'
import { Container, Divider, Grid, Typography } from '@mui/material'

import React, { useState } from 'react'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useClassNames } from './selection-supplier-modal.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.PURCHASED_PRODUCT],
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

const selectedButtonValueConfig = {
  ADD_NEW_SUPPLIER: 'ADD_NEW_SUPPLIER',
  SEND_REQUEST: 'SEND_REQUEST',
  SUPPLIER_TO_IDEAS: 'SUPPLIER_TO_IDEAS',
}

export const SelectionSupplierModal = ({
  product,
  onCloseModal,
  onClickFinalAddSupplierButton,
  onSubmitSeekSupplier,
  onClickSeekSupplierToIdea,
}) => {
  const [selectedButtonValue, setSelectedButtonValue] = useState('')
  const [clickNextOrPrevButton, setClickNextOrPrevButton] = useState(false)

  const [comment, setComment] = useState(product?.originalData.clientComment || '')

  const { classes: classNames } = useClassNames()

  const buttonSearchSupplierForIdeaClsx = cx(classNames.modalButton, classNames.searchSupplierForIdeaBtn, {
    [classNames.modalButtonActive]: selectedButtonValue === selectedButtonValueConfig.SUPPLIER_TO_IDEAS,
  })

  const buttonSendRequestClsx = cx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST,
  })
  const buttonAddSupplierClsx = cx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedButtonValue === selectedButtonValueConfig.ADD_NEW_SUPPLIER,
  })
  const modalTitleClsx = cx(classNames.modalTitle, { [classNames.modalTitleChange]: clickNextOrPrevButton })

  const onClickSearchSupplierForIdeaButton = () => {
    setSelectedButtonValue(selectedButtonValueConfig.SUPPLIER_TO_IDEAS)
  }

  const onClickSendRequestButton = () => {
    setSelectedButtonValue(selectedButtonValueConfig.SEND_REQUEST)
  }

  const onClickAddSupplierButton = () => {
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

    if (selectedButtonValue === selectedButtonValueConfig.SUPPLIER_TO_IDEAS) {
      setClickNextOrPrevButton(false)
      onCloseModal()
      onClickSeekSupplierToIdea()
    }
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={modalTitleClsx}>{t(TranslationKey['Find a supplier'])}</Typography>

      {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
        <div>
          <Field
            multiline
            label={t(TranslationKey['Update product comment:'])}
            labelClasses={classNames.modalLabel}
            minRows={6}
            maxRows={6}
            value={comment}
            placeholder={t(TranslationKey.Comment) + '...'}
            className={classNames.modalTextArea}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      ) : (
        <div className={classNames.btnsWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Supplier for product idea'])}</Typography>
          <div className={classNames.searchSupplierForIdeaButtonsWrapper}>
            <Button
              tooltipAttentionContent={t(TranslationKey['Paid service'])}
              className={buttonSearchSupplierForIdeaClsx}
              onClick={() => onClickSearchSupplierForIdeaButton()}
            >
              {t(TranslationKey['Send request for a supplier search for an idea'])}
            </Button>
          </div>

          <Divider orientation="horizontal" className={classNames.divider} />

          <Typography className={classNames.subTitle}>{t(TranslationKey['Supplier for a product card'])}</Typography>

          <div className={classNames.modalButtonsWrapper}>
            <Button
              tooltipAttentionContent={t(TranslationKey['Paid service'])}
              disabled={product && !clientToEditStatuses.includes(product?.originalData.status)}
              className={buttonSendRequestClsx}
              onClick={() => onClickSendRequestButton()}
            >
              {t(TranslationKey['Send request for supplier search'])}
            </Button>

            <Button
              tooltipAttentionContent={t(TranslationKey['Free service'])}
              disabled={product && !clientToEditStatuses.includes(product?.originalData.status)}
              className={buttonAddSupplierClsx}
              onClick={() => onClickAddSupplierButton()}
            >
              {t(TranslationKey['Add a new supplier'])}
            </Button>
          </div>
        </div>
      )}

      <Grid
        container
        spacing={2}
        className={cx(classNames.modalButtonWrapper, {
          [classNames.modalButtonNextStepWrapper]:
            selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton,
        })}
      >
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
            tooltipAttentionContent={
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
