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
  const { customProposal, openModal, onOpenModal, readOnly } = props

  const { classes: styles, cx } = useStyles()

  const {
    isClient,
    fields,
    setFields,
    showResultError,
    showConfirmModal,
    onToggleShowConfirmModal,
    onResultValue,
    onEditCustomProposal,
    onReceiveCustomProposal,
    onClickSuccessConfirm,
  } = useMainRequestResultModal(props)

  const clientOrReadOnly = isClient || props.readOnly

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header
          isClient={isClient}
          asin={customProposal?.request?.asin}
          executionTime={getMinutesDifferenceFromNow(customProposal?.proposal?.timeoutAt)}
          humanFriendlyId={customProposal?.request?.humanFriendlyId}
        />

        <Field
          multiline
          readOnly={clientOrReadOnly}
          minRows={9}
          maxRows={9}
          value={fields?.result}
          error={showResultError}
          placeholder={`${t(TranslationKey['Request result'])}...`}
          inputClasses={cx(styles.field, { [styles.notFocuced]: clientOrReadOnly })}
          inputProps={{ maxLength: MAX_DEFAULT_COMMENT_LEGTH }}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onResultValue(e.target.value)}
        />

        <Tabs
          readOnly={readOnly}
          isClient={isClient}
          productId={customProposal?.request?.product?._id}
          spec={customProposal?.request?.spec}
          fields={fields}
          setFields={setFields}
        />

        {!readOnly ? (
          <Footer
            isClient={isClient}
            disabledSendResultButton={showResultError}
            onEditCustomProposal={onEditCustomProposal}
            onReceiveCustomProposal={onReceiveCustomProposal}
            onToggleShowConfirmModal={onToggleShowConfirmModal}
          />
        ) : null}
      </div>

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          openModal={showConfirmModal}
          setOpenModal={onToggleShowConfirmModal}
          message={t(TranslationKey['Are you sure you want to send the result for rework?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Close)}
          onClickSuccessBtn={onClickSuccessConfirm}
          onClickCancelBtn={onToggleShowConfirmModal}
        />
      ) : null}
    </Modal>
  )
})
