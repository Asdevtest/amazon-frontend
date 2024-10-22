import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomPreviewGroup } from '@components/shared/custom-preview-group'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useStyles } from './ticket-form.style'

import { getStatusText } from '../feedback-view.config'

import { TicketFormModel } from './ticket-form.model'

interface TicketFormProps {
  onClose: () => void
  feedbackId?: string
}

export const TicketForm: FC<TicketFormProps> = observer(props => {
  const { onClose, feedbackId } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new TicketFormModel(feedbackId), [])

  return (
    <div className={styles.root}>
      <div className={cx(styles.block, styles.user)}>
        <div className={styles.flexRow}>
          <div>{getStatusText(viewModel.feedback?.status || 0)}</div>

          <div className={styles.flexRow}>
            <p>{`Updated ${viewModel.feedback?.updatedAt}`}</p>
            <p>{`ID ${viewModel.feedback?.xid}`}</p>
          </div>
        </div>

        <Text bold textRows={2} copyable={false} text={viewModel.feedback?.title || ''} />
        <CustomTextarea readOnly rows={6} value={viewModel.feedback?.text} />
        <CustomPreviewGroup width={50} data={viewModel.feedback?.media || []} />
      </div>

      {viewModel.showResponseBlock ? (
        <div className={cx(styles.block, styles.response)}>
          <CustomTextarea readOnly rows={6} value={viewModel.feedback?.responseText || ''} />
          <CustomPreviewGroup width={50} data={viewModel.feedback?.responseMedia || []} />
        </div>
      ) : null}

      <div className={styles.flexRow}>
        <CustomButton type="primary" size="large">
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
