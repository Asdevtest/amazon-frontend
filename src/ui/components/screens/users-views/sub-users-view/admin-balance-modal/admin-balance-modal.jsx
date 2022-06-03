import React, {useState} from 'react'

import {Container, Button, Typography, NativeSelect} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {ErrorButton} from '@components/buttons/error-button/error-button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './admin-balance-modal.style'

export const AdminBalanceModal = ({user, isWithdraw, onTriggerParentModal, onSubmit}) => {
  const classNames = useClassNames()

  const [balanceValue, setBalanceValue] = useState('')

  const [reasonValue, setReasonValue] = useState('')

  const [paymentType, setPaymentType] = useState('DEPOSIT')

  const [showConfirmModal, setConfirmModal] = useState(false)
  const onTriggerConfirmModal = () => setConfirmModal(prevState => !prevState)

  const onConfirm = () => {
    const data = {
      paymentType,
      recipientId: user.id || user._id,
      sum: isWithdraw ? Number(-balanceValue) : Number(balanceValue),
      comment: reasonValue,
    }
    onSubmit(data)
    onTriggerConfirmModal()
    onTriggerParentModal()
  }
  const onDecline = () => {
    onTriggerConfirmModal()
    onTriggerParentModal()
  }

  const renderPositiveMessage = (
    <div className={classNames.positiveMsg}>
      {`${t(TranslationKey['The balance of the user'])} ${user.name} ${t(
        TranslationKey['will be replenished by'],
      )} ${balanceValue}`}
    </div>
  )

  const renderNegativeMessage = (
    <div className={classNames.negativeMsg}>
      {`${t(TranslationKey['From the balance of the user'])} ${user.name} ${t(
        TranslationKey['will be debited by'],
      )} ${balanceValue}`}
    </div>
  )

  const confirmMsg = () => {
    const decreaseOrIncrease = isWithdraw ? t(TranslationKey.Decrease) : t(TranslationKey.Increase)
    return `${t(TranslationKey['Are you sure you want to'])} ${decreaseOrIncrease} ${t(
      TranslationKey['user balance'],
    )} ${user.name} ${t(TranslationKey.by)} ${balanceValue}?`
  }

  const disableButtonExecute = Number(balanceValue) <= 0

  return (
    <>
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {isWithdraw ? t(TranslationKey.Withdraw) : t(TranslationKey.Deposit)}
        </Typography>

        {isWithdraw && (
          <Field
            label={t(TranslationKey.Type)}
            inputComponent={
              <NativeSelect
                input={<Input fullWidth />}
                variant="filled"
                value={paymentType}
                onChange={e => setPaymentType(e.target.value)}
              >
                {['WITHDRAW', 'FINE'].map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </NativeSelect>
            }
          />
        )}

        <Field
          label={t(TranslationKey.Amount)}
          value={balanceValue}
          onChange={e =>
            checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) && setBalanceValue(e.target.value)
          }
        />

        <Field
          multiline
          label={t(TranslationKey.Reason)}
          minRows={4}
          rowsMax={4}
          value={reasonValue}
          placeholder={t(TranslationKey['Enter the reason...'])}
          className={classNames.modalTextArea}
          onChange={e => setReasonValue(e.target.value)}
        />

        {isWithdraw ? renderNegativeMessage : renderPositiveMessage}

        <div className={classNames.buttonWrapper}>
          <Button
            disableElevation
            disabled={disableButtonExecute}
            color="primary"
            variant="contained"
            onClick={onTriggerConfirmModal}
          >
            {t(TranslationKey.Execute)}
          </Button>
        </div>
      </Container>

      <Modal openModal={showConfirmModal} setOpenModal={onTriggerConfirmModal}>
        <div className={classNames.confirmModal}>
          <Typography paragraph>{confirmMsg()}</Typography>
          <div className={classNames.buttonWrapper}>
            <Button disableElevation color="primary" variant="contained" onClick={onConfirm}>
              {t(TranslationKey.Yes)}
            </Button>
            <ErrorButton disableElevation onClick={onDecline}>
              {t(TranslationKey.Cancel)}
            </ErrorButton>
          </div>
        </div>
      </Modal>
    </>
  )
}
