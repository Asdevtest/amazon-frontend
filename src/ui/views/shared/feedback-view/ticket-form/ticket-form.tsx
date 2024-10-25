import { Empty, Skeleton } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomPreviewGroup } from '@components/shared/custom-preview-group'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { formatNormDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { FeedbackStatus } from '@typings/enums/feedback-status'

import { useStyles } from './ticket-form.style'

import { getStatusColor, getStatusText } from '../feedback-view.config'

import { TicketFormModel } from './ticket-form.model'

export interface TicketFormProps {
  onClose: () => void
  creator?: boolean
  feedbackId?: string
  onUdateData?: () => void
}

export const TicketForm: FC<TicketFormProps> = observer(props => {
  const { onClose, creator } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new TicketFormModel(props), [])

  return (
    <div className={styles.root}>
      <Skeleton active loading={viewModel.loading} paragraph={{ rows: 12 }}>
        <div className={cx(styles.block, styles.user)}>
          <div className={styles.flexRow}>
            {creator && viewModel.feedback ? (
              <CustomSelect
                className={styles.select}
                options={viewModel.statusOptions}
                defaultValue={viewModel.feedback?.status}
                optionRender={option => (
                  <span style={{ color: getStatusColor(option.value as FeedbackStatus) }}>{option.label}</span>
                )}
                labelRender={option => (
                  <span style={{ color: getStatusColor(option.value as FeedbackStatus) }}>{option.label}</span>
                )}
                onChange={viewModel.onChangeStatus}
              />
            ) : (
              <Text
                maxContent
                copyable={false}
                color={getStatusColor(viewModel.feedback?.status)}
                text={getStatusText(viewModel.feedback?.status)}
              />
            )}

            <div className={styles.flexRow}>
              <Text
                maxContent
                copyable={false}
                text={`Updated: ${formatNormDateTime(viewModel.feedback?.updatedAt)}`}
              />
              <Text maxContent type="secondary" copyable={false} text={`ID: ${viewModel.feedback?.xid}`} />
            </div>
          </div>

          <Text bold textRows={2} copyable={false} text={viewModel.feedback?.title || ''} />
          <CustomTextarea readOnly rows={6} value={viewModel.feedback?.text || ''} />
          <CustomPreviewGroup size={50} data={viewModel.feedback?.media || []} />
        </div>

        {creator || viewModel.showResponseBlock ? (
          <div className={cx(styles.block, { [styles.response]: viewModel.showResponseBlock })}>
            <CustomTextarea
              readOnly={viewModel.showResponseBlock}
              rows={6}
              placeholder="Response"
              value={viewModel.responseText}
              onChange={viewModel.onChangeResponseText}
            />
            {viewModel.showResponseBlock ? (
              <CustomPreviewGroup size={50} data={viewModel.responseMedia} />
            ) : (
              <UploadFilesInput
                minimized
                images={viewModel.responseMedia}
                setImages={viewModel.onChangeResponseMedia}
              />
            )}
          </div>
        ) : (
          <Empty />
        )}
      </Skeleton>

      <div className={cx(styles.flexRow, styles.flexEnd)}>
        {creator && !viewModel.showResponseBlock ? (
          <CustomButton type="primary" size="large" onClick={viewModel.onSendReplyToFeedback}>
            {t(TranslationKey.Send)}
          </CustomButton>
        ) : null}
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
