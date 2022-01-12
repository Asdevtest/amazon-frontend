import React, {useState} from 'react'

import {Container, Button, Typography, NativeSelect} from '@material-ui/core'

import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button/error-button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './admin-balance-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').adminBalanceModal

const withdrawSelectOptions = [
  {value: textConsts.widthdrawOptionFine, label: textConsts.widthdrawOptionFine},
  {value: textConsts.widthdrawOptionWithdraw, label: textConsts.widthdrawOptionWithdraw},
]

const replenishSelectOptions = [
  {value: textConsts.replenishOptionReplenish, label: textConsts.replenishOptionReplenish},
  {value: textConsts.replenishOptionServicePayment, label: textConsts.replenishOptionServicePayment},
]

export const AdminBalanceModal = ({user, isWithdraw, onTriggerParentModal, onSubmit}) => {
  const classNames = useClassNames()
  const [balanceValue, setBalanceValue] = useState('')
  const [reasonValue, setReasonValue] = useState(
    isWithdraw ? textConsts.widthdrawOptionFine : textConsts.replenishOptionReplenish,
  )
  const [showConfirmModal, setConfirmModal] = useState(false)
  const onTriggerConfirmModal = () => setConfirmModal(prevState => !prevState)
  const onConfirm = () => {
    const data = {
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
      {`${textConsts.msgSubject} ${user.name} ${textConsts.msgPosPredicate} ${balanceValue}`}
    </div>
  )

  const renderNegativeMessage = (
    <div className={classNames.negativeMsg}>
      {`${textConsts.msgSubject} ${user.name} ${textConsts.msgNegPredicate} ${balanceValue}`}
    </div>
  )

  const confirmMsg = () => {
    const decreaseOrIncrease = isWithdraw ? textConsts.confirmMsgDecrease : textConsts.confirmMsgIncrease
    return `${textConsts.confirmMsgAreYouSureYouWantTo} ${decreaseOrIncrease} ${textConsts.confirmMsgTheBalanceOfTheUser} ${user.name} ${textConsts.confirmMsgBy} ${balanceValue}?`
  }

  const renderOptions = options => (
    <>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  )

  const disableButtonExecute = balanceValue === '0' || balanceValue === ''

  return (
    <>
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {isWithdraw ? textConsts.titleWithdraw : textConsts.titleReplenish}
        </Typography>

        <Field
          label={textConsts.balanceLabel}
          value={balanceValue}
          onChange={e => {
            checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) && setBalanceValue(e.target.value)
          }}
        />
        <Field
          containerClasses={classNames.field}
          label={textConsts.reasonLabel}
          inputComponent={
            <NativeSelect
              variant="filled"
              value={reasonValue}
              input={<Input fullWidth />}
              onChange={e => setReasonValue(e.target.value)}
            >
              {isWithdraw ? renderOptions(withdrawSelectOptions) : renderOptions(replenishSelectOptions)}
            </NativeSelect>
          }
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
            {textConsts.executeBtn}
          </Button>
        </div>
      </Container>

      <Modal openModal={showConfirmModal} setOpenModal={onTriggerConfirmModal}>
        <div className={classNames.confirmModal}>
          <Typography paragraph>{confirmMsg()}</Typography>
          <div className={classNames.buttonWrapper}>
            <Button disableElevation color="primary" variant="contained" onClick={onConfirm}>
              {textConsts.confirmBtn}
            </Button>
            <ErrorButton disableElevation onClick={onDecline}>
              {textConsts.declineBtn}
            </ErrorButton>
          </div>
        </div>
      </Modal>
    </>
  )
}
