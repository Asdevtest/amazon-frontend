import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
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
import { IFieldsAfterRework, IFieldsToRework } from './main-request-result-modal.type'

interface MainRequestResultModalProps {
  customProposal: ICustomProposal
  userInfo: IFullUser
  openModal: boolean
  onOpenModal: () => void
  onEditCustomProposal: (id: string, fields: IFieldsToRework | IFieldsAfterRework) => void
  readonly?: boolean
}

export const MainRequestResultModal: FC<MainRequestResultModalProps> = memo(props => {
  const { customProposal, userInfo, openModal, onOpenModal, onEditCustomProposal } = props

  const { classes: styles } = useStyles()

  const isClient = checkIsClient(UserRoleCodeMap[userInfo?.role])

  const getInittialFieldsToRework = (): IFieldsToRework => ({
    reason: '',
    timeLimitInMinutes: 0,
    media: [],
  })

  const getInittialFieldsAfterRework = (): IFieldsAfterRework => ({
    result: '',
    publicationLinks: [],
    media: [],
  })

  const [fieldsToRework, setFieldsToRework] = useState<IFieldsToRework>(getInittialFieldsToRework())
  const [fieldsAfterRework, setFieldsAfterRework] = useState<IFieldsAfterRework>(getInittialFieldsAfterRework())
  const [resultText, setResultText] = useState(customProposal?.details?.result || '')

  const handleEditCustomProposal = () => {
    onEditCustomProposal(customProposal?.proposal?._id, isClient ? fieldsToRework : fieldsAfterRework)
    onOpenModal()
  }

  useEffect(() => {
    if (customProposal) {
      if (isClient) {
        setFieldsToRework(prevFieldsToRework => ({
          ...prevFieldsToRework,
          reason: customProposal?.details?.reasonToCorrect,
          timeLimitInMinutes: getMinutesDifferenceFromNow(customProposal?.proposal?.timeoutAt),
          media: customProposal?.proposal?.media?.map((file, index) => ({
            _id: file._id,
            fileLink: file.fileLink,
            commentByClient: file.commentByClient,
            index,
          })),
        }))
      } else {
        setFieldsAfterRework(prevFieldsAfterRework => ({
          ...prevFieldsAfterRework,
          result: customProposal?.details?.result,
          publicationLinks: customProposal?.details?.publicationLinks,
          media: customProposal?.proposal?.media?.map((file, index) => ({
            _id: file._id,
            fileLink: file.fileLink,
            commentByPerformer: file.commentByPerformer,
            index,
          })),
        }))
      }
    }
  }, [customProposal])

  useEffect(() => {
    if (!isClient) {
      setFieldsAfterRework(prevFieldsAfterRework => ({ ...prevFieldsAfterRework, result: resultText }))
    }
  }, [resultText])

  console.log('fieldsAfterRework', fieldsAfterRework)

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
          value={resultText}
          placeholder={`${t(TranslationKey['Request result'])}...`}
          inputClasses={styles.field}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setResultText(e.target.value)}
        />

        <Tabs
          isClient={isClient}
          media={customProposal?.proposal?.media}
          fieldsToRework={fieldsToRework}
          fieldsAfterRework={fieldsAfterRework}
          setFieldsToRework={setFieldsToRework}
          setFieldsAfterRework={setFieldsAfterRework}
        />

        <Footer isClient={isClient} onEditCustomProposal={handleEditCustomProposal} onOpenModal={onOpenModal} />
      </div>
    </Modal>
  )
})
