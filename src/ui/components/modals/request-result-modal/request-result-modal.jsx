/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {useEffect} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Modal} from '@components/modal'

import {t} from '@utils/translations'

import {useClassNames} from './request-result-modal.style'

export const RequestResultModal = ({openModal, setOpenModal, title, btnText, onClickBtn, isWarning}) => {
  const {classes: classNames} = useClassNames()

  // useEffect(() => {
  //   const listener = event => {
  //     if (openModal && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
  //       event.preventDefault()
  //       onClickBtn()
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  //   return () => {
  //     document.removeEventListener('keydown', listener)
  //   }
  // }, [openModal])

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMainWrapper}>
        <Typography className={cx(classNames.modalTitle)}>{t(TranslationKey['Result of the request'])}</Typography>

        <Field
          inputProps={{maxLength: 100}}
          labelClasses={classNames.label}
          label={'Amazon order ID*'}
          className={classNames.input}
          containerClasses={classNames.numberInputField}
          // value={box.lengthCmWarehouse}
          // onChange={setNewBoxField('lengthCmWarehouse')}
        />

        <div className={classNames.buttonsWrapper}>
          <Button success disableElevation className={cx(classNames.button)} onClick={onClickBtn}>
            {t(TranslationKey.Send)}
          </Button>

          <Button
            disableElevation
            variant="text"
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={setOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
