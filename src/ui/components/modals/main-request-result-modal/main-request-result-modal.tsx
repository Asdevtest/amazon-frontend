import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { MAX_DEFAULT_COMMENT_LEGTH } from '@constants/requests/request'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { checkIsClient } from '@utils/checks'
import { getMinutesDifferenceFromNow } from '@utils/date-time'
import { t } from '@utils/translations'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './main-request-result-modal.style'

import { Footer, Header, Tabs } from './components'
import { getFieldsToRework } from './helper/get-fields-to-rework'
import { getFieldsAfterRework } from './helper/get-fileds-after-rework'
import { IFields } from './main-request-result-modal.type'

interface MainRequestResultModalProps {
  customProposal: ICustomProposal
  userInfo: IFullUser
  openModal: boolean
  onOpenModal: () => void
  onEditCustomProposal: (id: string, fields: IFields, status?: string) => void
  onReceiveCustomProposal: () => void
  showActionButtons?: boolean
}

export const MainRequestResultModal: FC<MainRequestResultModalProps> = memo(props => {
  const {
    customProposal,
    userInfo,
    openModal,
    onOpenModal,
    onEditCustomProposal,
    onReceiveCustomProposal,
    showActionButtons,
  } = props

  const { classes: styles } = useStyles()

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
        timeLimitInMinutes: getMinutesDifferenceFromNow(customProposal?.proposal?.timeoutAt) || 0,
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
    const sentFields = isClient ? getFieldsToRework(fields) : getFieldsAfterRework(fields)

    onEditCustomProposal(customProposal?.proposal?._id, sentFields)
    onOpenModal()
  }

  return (
    <Modal openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header
          isClient={isClient}
          executionTime={customProposal?.proposal?.execution_time}
          asin={customProposal?.request?.asin}
          humanFriendlyId={customProposal?.request?.humanFriendlyId}
        />

        <Field
          multiline
          readOnly={isClient}
          minRows={9}
          maxRows={9}
          value={fields.result}
          placeholder={`${t(TranslationKey['Request result'])}...`}
          inputClasses={styles.field}
          inputProps={{ maxLength: MAX_DEFAULT_COMMENT_LEGTH }}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleResultValue(e.target.value)}
        />

        <Tabs isClient={isClient} fields={fields} setFields={setFields} />

        <Footer
          showActionButtons={showActionButtons}
          isClient={isClient}
          onEditCustomProposal={handleEditCustomProposal}
          onOpenModal={onOpenModal}
          onReceiveCustomProposal={onReceiveCustomProposal}
        />
      </div>
    </Modal>
  )
})
