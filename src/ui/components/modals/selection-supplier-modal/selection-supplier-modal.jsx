import { cx } from '@emotion/css'
import React, { useEffect, useState } from 'react'

import { Container, Divider, Grid, Typography } from '@mui/material'

import { SelectedButtonValueConfig } from '@constants/configs/buttons'
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

export const SelectionSupplierModal = ({
  product,
  title,
  buttonValue,
  onCloseModal,
  onClickFinalAddSupplierButton,
  onSubmitSeekSupplier,
  onClickSeekSupplierToIdea,
}) => {
  const [selectedButtonValue, setSelectedButtonValue] = useState(buttonValue || '')
  const [clickNextOrPrevButton, setClickNextOrPrevButton] = useState(!!buttonValue || false)

  const [comment, setComment] = useState(product?.originalData?.clientComment || '')

  const { classes: classNames } = useClassNames()

  const buttonSearchSupplierForIdeaClsx = cx(classNames.modalButton, classNames.searchSupplierForIdeaBtn, {
    [classNames.modalButtonActive]: selectedButtonValue === SelectedButtonValueConfig.SUPPLIER_TO_IDEAS,
  })

  const buttonSendRequestClsx = cx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedButtonValue === SelectedButtonValueConfig.SEND_REQUEST,
  })
  const buttonAddSupplierClsx = cx(classNames.modalButton, {
    [classNames.modalButtonActive]: selectedButtonValue === SelectedButtonValueConfig.ADD_NEW_SUPPLIER,
  })

  const onClickSearchSupplierForIdeaButton = () => {
    setSelectedButtonValue(SelectedButtonValueConfig.SUPPLIER_TO_IDEAS)
  }

  const onClickSendRequestButton = () => {
    setSelectedButtonValue(SelectedButtonValueConfig.SEND_REQUEST)
  }

  const onClickAddSupplierButton = () => {
    setSelectedButtonValue(SelectedButtonValueConfig.ADD_NEW_SUPPLIER)
  }

  const onClickNextButton = () => {
    if (selectedButtonValue === SelectedButtonValueConfig.SEND_REQUEST) {
      setClickNextOrPrevButton(true)

      if (clickNextOrPrevButton) {
        onSubmitSeekSupplier(comment)
      }
    }

    if (selectedButtonValue === SelectedButtonValueConfig.ADD_NEW_SUPPLIER) {
      setClickNextOrPrevButton(false)
      onCloseModal()
      onClickFinalAddSupplierButton()
    }

    if (selectedButtonValue === SelectedButtonValueConfig.SUPPLIER_TO_IDEAS) {
      setClickNextOrPrevButton(false)
      onCloseModal()
      onClickSeekSupplierToIdea()
    }
  }

  return (
    <Container disableGutters className={classNames.modalWrapper}>
      <Typography className={cx(classNames.modalTitle, { [classNames.modalTitleChange]: clickNextOrPrevButton })}>
        {title || t(TranslationKey['Find a supplier'])}
      </Typography>

      {selectedButtonValue === SelectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
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
          {/* <Typography className={classNames.subTitle}>{t(TranslationKey['Supplier for product idea'])}</Typography>
          <div className={classNames.searchSupplierForIdeaButtonsWrapper}>
            <Button
              tooltipAttentionContent={t(TranslationKey['Paid service'])}
              className={buttonSearchSupplierForIdeaClsx}
              onClick={() => onClickSearchSupplierForIdeaButton()}
            >
              {t(TranslationKey['Send request for a supplier search for an idea'])}
            </Button>
          </div>

          <Divider orientation="horizontal" className={classNames.divider} /> */}

          <Typography className={classNames.subTitle}>{t(TranslationKey['Supplier for a product card'])}</Typography>

          <div className={classNames.modalButtonsWrapper}>
            <Button
              tooltipAttentionContent={t(TranslationKey['Paid service'])}
              disabled={product && !clientToEditStatuses.includes(product?.originalData?.status)}
              className={buttonSendRequestClsx}
              onClick={() => onClickSendRequestButton()}
            >
              {t(TranslationKey['Send request for supplier search'])}
            </Button>

            <Button
              tooltipAttentionContent={t(TranslationKey['Free service'])}
              disabled={product && !clientToEditStatuses.includes(product?.originalData?.status)}
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
            selectedButtonValue === SelectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton,
        })}
      >
        {selectedButtonValue === SelectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
          <Grid item>
            <Button
              className={classNames.modalButtonBack}
              onClick={() => (buttonValue ? onCloseModal() : setClickNextOrPrevButton(false))}
            >
              {buttonValue ? t(TranslationKey.Cancel) : t(TranslationKey.Back)}
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
