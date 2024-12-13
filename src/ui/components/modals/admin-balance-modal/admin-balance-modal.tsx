import { FC, useState } from 'react'

import { Container, MenuItem, Select } from '@mui/material'

import { EntityType } from '@constants/finances/entity-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './admin-balance-modal.style'

interface AdminBalanceModalProps {
  user: ICreatedBy
  isWithdraw: boolean
  onTriggerParentModal: () => void
  onSubmit: (data: { entityType: EntityType; recipientId: string; sum: number; comment: string }) => void
}

export const AdminBalanceModal: FC<AdminBalanceModalProps> = ({ user, isWithdraw, onTriggerParentModal, onSubmit }) => {
  const { classes: styles } = useStyles()

  const [balanceValue, setBalanceValue] = useState<string>('')
  const [reasonValue, setReasonValue] = useState<string>('')

  const [entityType, setPaymentType] = useState<EntityType>(isWithdraw ? EntityType.WITHDRAW : EntityType.DEPOSIT)
  const [showConfirmModal, setConfirmModal] = useState<boolean>(false)

  const balance = balanceValue || '...'

  const onTriggerConfirmModal = () => setConfirmModal(prevState => !prevState)

  const onConfirm = () => {
    const data = {
      entityType,
      recipientId: user._id,
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
      )} ${balance}`}
    </div>
  )

  const renderNegativeMessage = (
    <div className={styles.negativeMsg}>
      {`${t(TranslationKey['From the balance of the user'])} ${user.name} ${t(
        TranslationKey['will be debited by'],
      )} ${balance}`}
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
        <h3 className={styles.title}>{isWithdraw ? t(TranslationKey.Withdraw) : t(TranslationKey.Deposit)}</h3>

        {isWithdraw && (
          <Field
            label={t(TranslationKey.Type)}
            inputComponent={
              <Select
                input={<Input fullWidth />}
                variant="filled"
                value={entityType}
                onChange={e => setPaymentType(e.target.value as EntityType)}
              >
                {[EntityType.WITHDRAW, EntityType.FINE].map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            }
          />
        )}

        <Field
          label={t(TranslationKey.Amount) + ''}
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
          <CustomButton disabled={disableButtonExecute} onClick={onTriggerConfirmModal}>
            {t(TranslationKey.Execute)}
          </CustomButton>
        </div>
      </Container>

      <Modal openModal={showConfirmModal} setOpenModal={onTriggerConfirmModal}>
        <div className={styles.confirmModal}>
          <p>{confirmMsg()}</p>
          <div className={styles.buttonWrapper}>
            <CustomButton onClick={onConfirm}>{t(TranslationKey.Yes)}</CustomButton>
            <CustomButton onClick={onDecline}>{t(TranslationKey.Close)}</CustomButton>
          </div>
        </div>
      </Modal>
    </>
  )
}
