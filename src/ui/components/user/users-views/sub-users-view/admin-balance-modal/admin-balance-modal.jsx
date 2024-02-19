import { useState } from 'react'

import { Container, MenuItem, Select, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './admin-balance-modal.style'

const paymentTypeSettings = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
  FINE: 'FINE',
}

export const AdminBalanceModal = ({ user, isWithdraw, onTriggerParentModal, onSubmit }) => {
  const { classes: styles } = useStyles()

  const [balanceValue, setBalanceValue] = useState('')

  const [reasonValue, setReasonValue] = useState('')

  const [paymentType, setPaymentType] = useState(
    isWithdraw ? paymentTypeSettings.WITHDRAW : paymentTypeSettings.DEPOSIT,
  )

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
    <div className={styles.positiveMsg}>
      {`${t(TranslationKey['The balance of the user'])} ${user.name} ${t(
        TranslationKey['will be replenished by'],
      )} ${balanceValue}`}
    </div>
  )

  const renderNegativeMessage = (
    <div className={styles.negativeMsg}>
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
      <Container disableGutters className={styles.modalContainer}>
        <Typography paragraph variant="h3" className={styles.title}>
          {isWithdraw ? t(TranslationKey.Withdraw) : t(TranslationKey.Deposit)}
        </Typography>

        {isWithdraw && (
          <Field
            label={t(TranslationKey.Type)}
            inputComponent={
              <Select
                input={<Input fullWidth />}
                variant="filled"
                value={paymentType}
                onChange={e => setPaymentType(e.target.value)}
              >
                {[paymentTypeSettings.WITHDRAW, paymentTypeSettings.FINE].map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            }
          />
        )}

        <Field
          label={t(TranslationKey.Amount) + ', $'}
          inputProps={{ maxLength: 8 }}
          value={balanceValue}
          onChange={e =>
            checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) && setBalanceValue(e.target.value)
          }
        />

        <Field
          multiline
          label={t(TranslationKey.Comment)}
          minRows={4}
          maxRows={4}
          value={reasonValue}
          placeholder={t(TranslationKey['Add comment'])}
          className={styles.modalTextArea}
          onChange={e => setReasonValue(e.target.value)}
        />

        {isWithdraw ? renderNegativeMessage : renderPositiveMessage}

        <div className={styles.buttonWrapper}>
          <Button disabled={disableButtonExecute} onClick={onTriggerConfirmModal}>
            {t(TranslationKey.Execute)}
          </Button>
        </div>
      </Container>

      <Modal openModal={showConfirmModal} setOpenModal={onTriggerConfirmModal}>
        <div className={styles.confirmModal}>
          <Typography paragraph>{confirmMsg()}</Typography>
          <div className={styles.buttonWrapper}>
            <Button onClick={onConfirm}>{t(TranslationKey.Yes)}</Button>
            <Button onClick={onDecline}>{t(TranslationKey.Cancel)}</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
