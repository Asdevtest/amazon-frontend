import { useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'

import { checkIsClient } from '@utils/checks'
import { getMinutesDifferenceFromNow } from '@utils/date-time'

import { getFieldsToRework } from './helper/get-fields-to-rework'
import { getFieldsAfterRework } from './helper/get-fileds-after-rework'
import { IFields, MainRequestResultModalProps } from './main-request-result-modal.type'

export const useMainRequestResultModal = ({
  customProposal,
  userInfo,
  onEditCustomProposal,
  onReceiveCustomProposal,
  onOpenModal,
}: MainRequestResultModalProps) => {
  const isClient = checkIsClient(UserRoleCodeMap[userInfo?.role])
  const getInittialFields = (): IFields => ({
    reason: '',
    timeLimitInMinutes: 0,
    result: '',
    publicationLinks: [],
    media: [],
  })

  const [fields, setFields] = useState<IFields>(getInittialFields())

  useEffect(() => {
    if (customProposal) {
      setFields(prevFields => ({
        ...prevFields,
        reason: customProposal?.details?.reasonToCorrect || '',
        timeLimitInMinutes: 0,
        result: customProposal?.details?.result || '',
        publicationLinks: customProposal?.details?.publicationLinks || [],
        media:
          customProposal?.proposal?.media?.map((file, index) => ({
            _id: file._id,
            fileLink: file.fileLink,
            commentByClient: file.commentByClient,
            commentByPerformer: file.commentByPerformer,
            index,
          })) || [],
      }))
    }
  }, [customProposal])

  const handleResultValue = (result: string) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        result,
      }))
    }
  }

  const handleEditCustomProposal = () => {
    const sentFields = isClient
      ? getFieldsToRework(fields, getMinutesDifferenceFromNow(customProposal?.proposal?.timeoutAt))
      : getFieldsAfterRework(fields)

    if (onEditCustomProposal) {
      onEditCustomProposal(customProposal?.proposal?._id, sentFields)
    }

    onOpenModal()
  }

  const handleReceiveCustomProposal = () => {
    if (onReceiveCustomProposal) {
      onReceiveCustomProposal()
    }

    onOpenModal()
  }

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleToggleShowConfirmModal = () => setShowConfirmModal(prev => !prev)

  const handleClickSuccessConfirm = () => {
    handleEditCustomProposal()
    handleToggleShowConfirmModal()
  }

  return {
    isClient,
    fields,
    setFields,
    showConfirmModal,
    onToggleShowConfirmModal: handleToggleShowConfirmModal,
    onResultValue: handleResultValue,
    onEditCustomProposal: handleEditCustomProposal,
    onReceiveCustomProposal: handleReceiveCustomProposal,
    onClickSuccessConfirm: handleClickSuccessConfirm,
  }
}
