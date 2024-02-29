import { ChangeEvent, FC, memo } from 'react'

import { MAX_DEFAULT_COMMENT_LEGTH } from '@constants/requests/request'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { getMinutesDifferenceFromNow } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './main-request-result-modal.style'

import { ConfirmationModal } from '../confirmation-modal'

import { Footer, Header, Tabs } from './components'
import { MainRequestResultModalProps } from './main-request-result-modal.type'
import { useMainRequestResultModal } from './use-main-request-result-modal'

export const MainRequestResultModal: FC<MainRequestResultModalProps> = memo(props => {
  const { customProposal, openModal, onOpenModal, readOnly, showActionButtons } = props

  const { classes: styles, cx } = useStyles()

  const {
    isClient,
    fields,
    setFields,
    showConfirmModal,
    onToggleShowConfirmModal,
    onResultValue,
    onEditCustomProposal,
    onReceiveCustomProposal,
    onClickSuccessConfirm,
  } = useMainRequestResultModal(props)

  const isResultFieldEmpty = fields?.result?.trim().length === 0
  const disabledSendResultButton =
    (fields?.result?.trim().length === 0 ||
      (fields?.publicationLinks || []).some(link => link.length === 0) ||
      fields.media.some(file => !file.fileLink)) &&
    !isClient

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header
          asin={customProposal?.request?.asin}
          executionTime={getMinutesDifferenceFromNow(customProposal?.proposal?.timeoutAt)}
          humanFriendlyId={customProposal?.request?.humanFriendlyId}
        />

        <Field
          multiline
          readOnly={isClient || props.readOnly}
          minRows={9}
          maxRows={9}
          value={fields?.result}
          error={isResultFieldEmpty}
          placeholder={`${t(TranslationKey['Request result'])}...`}
          inputClasses={cx(styles.field, { [styles.notFocuced]: isClient || props.readOnly })}
          inputProps={{ maxLength: MAX_DEFAULT_COMMENT_LEGTH }}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onResultValue(e.target.value)}
        />

        <Tabs readOnly={readOnly} isClient={isClient} fields={fields} setFields={setFields} />

        {!readOnly ? (
          <Footer
            isClient={isClient}
            showActionButtons={showActionButtons}
            disabledSendResultButton={disabledSendResultButton}
            onEditCustomProposal={onEditCustomProposal}
            onReceiveCustomProposal={onReceiveCustomProposal}
            onToggleShowConfirmModal={onToggleShowConfirmModal}
          />
        ) : null}
      </div>

      <ConfirmationModal
        openModal={showConfirmModal}
        setOpenModal={onToggleShowConfirmModal}
        message={t(TranslationKey['Are you sure you want to send the result for rework?'])}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.Cancel)}
        onClickSuccessBtn={onClickSuccessConfirm}
        onClickCancelBtn={onToggleShowConfirmModal}
      />
    </Modal>
  )
})
