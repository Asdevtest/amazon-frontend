import { FC } from 'react'

import { Divider } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreateNewDesignerProposalContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

// import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateOnlyTime, formatNormDateTime } from '@utils/date-time'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useClassNames } from './chat-message-create-new-designer-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreateNewDesignerProposalContract>
  isShowChatInfo?: boolean
}

export const ChatMessageCreateNewDesignerProposal: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: classNames, cx } = useClassNames()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  return (
    <div className={classNames.root}>
      <div className={cx(classNames.mainWrapper, { [classNames.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={cx(classNames.mainSubWrapper, { [classNames.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={classNames.header}>
            <p className={classNames.headerText}>{t(TranslationKey.Request)}</p>

            {message.humanFriendlyId ? (
              <div className={classNames.idWrapper}>
                <p className={cx(classNames.idText, classNames.idTitle)}>{t(TranslationKey.ID)}</p>
                <p className={classNames.idText}>{message.humanFriendlyId}</p>
              </div>
            ) : null}
          </div>

          <p className={classNames.descriptionText}>{message.data.request?.title}</p>

          {/* <CustomTextEditor
                readOnly
                conditions={message.data.request?.details?.conditions}
                changeConditions={undefined}
                editorMaxHeight={undefined}
                verticalResize={undefined}
                textToCheck={undefined}
              /> */}

          <div className={classNames.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Deadline)}
              value={formatNormDateTime(message.data.request?.timeoutAt)}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Request price'])}
              value={<p className={classNames.accentText}>{toFixedWithDollarSign(message.data.request?.price, 2)}</p>}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.data.request?.media?.map(el => el.fileLink)}
          />
        </div>

        <Divider
          orientation={isShowChatInfo ? 'horizontal' : 'vertical'}
          className={cx(classNames.divider, { [classNames.dividerShowChatInfo]: isShowChatInfo })}
        />

        <div className={cx(classNames.mainSubWrapper, { [classNames.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={classNames.header}>
            <p className={classNames.headerText}>{t(TranslationKey.Proposal)}</p>
            <p className={classNames.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
          </div>

          <p className={classNames.descriptionText}>{message.data.proposal?.comment}</p>

          <div className={classNames.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey['Time to complete'])}
              value={<p className={classNames.accentText}>{minsToTime(message.data.proposal?.execution_time)}</p>}
              bgColor="green"
              rootClasses={cx(classNames.labelValueBlock, { [classNames.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={classNames.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.data.proposal.linksToMediaFiles}
          />
        </div>
      </div>
    </div>
  )
}
