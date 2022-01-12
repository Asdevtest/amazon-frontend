import React, {useState} from 'react'

import {Container, Grid, TextareaAutosize, Tooltip, Typography, Zoom} from '@material-ui/core'
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

  const toolTipSendRequestClsx = clsx(classNames.toolTip, {[classNames.toolTipActive]: selectedSendRequestButton})
  const toolTipAddSupplierClsx = clsx(classNames.toolTip, {[classNames.toolTipActive]: selectedAddSupplierButton})
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
    <Container disableGutters>
      <Typography className={modalTitleClsx}>{textConsts.modalTitle}</Typography>

      {selectedButtonValue === selectedButtonValueConfig.SEND_REQUEST && clickNextOrPrevButton ? (
        <div>
          <Typography className={classNames.modalSubTitle}>{textConsts.modalSubTitle}</Typography>
          <Field
            inputComponent={
              <TextareaAutosize placeholder={textConsts.modalPlaceholder} className={classNames.modalTextArea} />
            }
          />
        </div>
      ) : (
        <Grid container spacing={3} className={classNames.modalToolTipWrapper}>
          <Grid item>
            <Tooltip
              arrow
              TransitionComponent={Zoom}
              title="Платная услуга"
              placement="top-end"
              className={toolTipSendRequestClsx}
            >
              <Button className={classNames.modalButton} onClick={() => onClickSendRequestButton()}>
                Отправить заявку на поиск поставщика
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip
              TransitionComponent={Zoom}
              title="Бесплатно"
              placement="top-end"
              className={toolTipAddSupplierClsx}
            >
              <Button className={classNames.modalButton} onClick={() => onClickAddSupplierButton()}>
                Добавить нового поставщика
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
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
