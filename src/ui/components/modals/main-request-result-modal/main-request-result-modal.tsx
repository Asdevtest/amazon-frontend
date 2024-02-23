import { ChangeEvent, FC, memo } from 'react'

import { MAX_DEFAULT_COMMENT_LEGTH } from '@constants/requests/request'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './main-request-result-modal.style'

import { Footer, Header, Tabs } from './components'
import { MainRequestResultModalProps } from './main-request-result-modal.type'
import { useMainRequestResultModal } from './use-main-request-result-modal'

export const MainRequestResultModal: FC<MainRequestResultModalProps> = memo(props => {
  const { customProposal, openModal, onOpenModal, onReceiveCustomProposal, showActionButtons } = props

  const { classes: styles, cx } = useStyles()

  const { isClient, fields, setFields, onResultValue, onEditCustomProposal } = useMainRequestResultModal(props)

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
          inputClasses={cx(styles.field, { [styles.notFocuced]: isClient })}
          inputProps={{ maxLength: MAX_DEFAULT_COMMENT_LEGTH }}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onResultValue(e.target.value)}
        />

        <Tabs isClient={isClient} fields={fields} setFields={setFields} />

        <Footer
          showActionButtons={showActionButtons}
          isClient={isClient}
          onEditCustomProposal={onEditCustomProposal}
          onOpenModal={onOpenModal}
          onReceiveCustomProposal={onReceiveCustomProposal}
        />
      </div>
    </Modal>
  )
})
