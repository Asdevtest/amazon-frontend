import React, {useState} from 'react'

import {Container, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './selection-supplier-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').selectionSupplierModal

export const SelectionSupplierModal = ({onCloseModal, onTriggerOpenModal}) => {
  const [selectedSendRequestButton, setSelectedSendRequestButton] = useState(false)
  const [selectedAddSupplierButton, setSelectedAddSupplierButton] = useState(false)
  const [selectedButtonValue, setSelectedButtonValue] = useState('')
  const [clickNextOrPrevButton, setClickNextOrPrevButton] = useState(false)

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
          <Field multiline placeholder={textConsts.modalPlaceholder} className={classNames.modalTextArea} />
        </div>
      ) : (
        <div className={classNames.modalButtonsWrapper}>
          <Button
            tooltipContent={textConsts.searchSupplierTooltip}
            className={buttonSendRequestClsx}
            onClick={() => onClickSendRequestButton()}
          >
            Отправить заявку на поиск поставщика
          </Button>

          <Button
            tooltipContent={textConsts.newSupplierTooltip}
            className={buttonAddSupplierClsx}
            onClick={() => onClickAddSupplierButton()}
          >
            Добавить нового поставщика
          </Button>
        </div>
      )}

      <Grid container spacing={2} className={classNames.modalButtonWrapper}>
        {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
          <Grid item>
            <Button className={classNames.modalButtonBack} onClick={() => setClickNextOrPrevButton(false)}>
              Назад
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Button className={classNames.modalButtonBack}>Пропустить</Button>
          </Grid>
        )}

        <Grid item>
          <SuccessButton
            disabled={!selectedButtonValue}
            className={classNames.modalButtonNext}
            onClick={() => onClickNextButton()}
          >
            Далее
          </SuccessButton>
        </Grid>
      </Grid>
    </Container>
  )
}
