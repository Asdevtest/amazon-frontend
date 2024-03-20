import { FC } from 'react'

import { Divider } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatMessageDataCreateNewBloggerProposalContract } from '@models/chat-model/contracts/chat-message-data.contract'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { formatDateOnlyTime, formatNormDateTime } from '@utils/date-time'
import { minsToTime, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat-message-create-new-blogger-proposal.style'

import { LabelValuePairBlock } from '../label-value-pair-block'

interface Props {
  message: ChatMessageContract<ChatMessageDataCreateNewBloggerProposalContract>
  isShowChatInfo?: boolean
}

export const ChatMessageCreateNewBloggerProposal: FC<Props> = ({ message, isShowChatInfo }) => {
  const { classes: styles, cx } = useStyles()
  const { isMobileResolution } = useCreateBreakpointResolutions()

  return (
    <div className={styles.root}>
      <div className={cx(styles.mainWrapper, { [styles.mainWrapperShowChatInfo]: isShowChatInfo })}>
        <div className={cx(styles.mainSubWrapper, { [styles.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={styles.header}>
            <p className={styles.headerText}>{t(TranslationKey.Request)}</p>

            {message.humanFriendlyId ? (
              <div className={styles.idWrapper}>
                <p className={cx(styles.idText, styles.idTitle)}>{t(TranslationKey.ID)}</p>
                <p className={styles.idText}>{message.humanFriendlyId}</p>
              </div>
            ) : null}
          </div>

          <p className={styles.descriptionText}>{message.data.request?.title}</p>

          <div className={styles.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Deadline)}
              value={formatNormDateTime(message.data.request.timeoutAt)}
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Request price'])}
              value={<p className={styles.accentText}>{toFixedWithDollarSign(message.data.request.price, 2)}</p>}
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Product price'])}
              value={
                <div className={styles.priceAmazonWrapper}>
                  <p className={styles.cashBackPrice}>
                    {`$ ${toFixed(
                      message.data.request.priceAmazon -
                        (message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100,
                      2,
                    )}`}
                  </p>

                  <p className={styles.redText}>{`$ ${toFixed(message.data.request.priceAmazon, 2)}`}</p>
                </div>
              }
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={'CashBack'}
              value={
                <p className={styles.accentText}>
                  {`$ ${toFixed((message.data.request.priceAmazon * message.data.request.cashBackInPercent) / 100, 2)}`}
                </p>
              }
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={styles.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

          <PhotoAndFilesSlider
            smallSlider={!isMobileResolution}
            column={isShowChatInfo || isMobileResolution}
            files={message.data.request?.media?.map(el => el.fileLink)}
          />
        </div>

        <Divider
          orientation={isShowChatInfo ? 'horizontal' : 'vertical'}
          className={cx(styles.divider, { [styles.dividerShowChatInfo]: isShowChatInfo })}
        />

        <div className={cx(styles.mainSubWrapper, { [styles.mainSubWrapperShowChatInfo]: isShowChatInfo })}>
          <div className={styles.header}>
            <p className={styles.headerText}>{t(TranslationKey.Proposal)}</p>
            <p className={styles.timeText}>{formatDateOnlyTime(message.createdAt)}</p>
          </div>

          <p className={styles.descriptionText}>{message.data.proposal.comment}</p>

          <div className={styles.infosWrapper}>
            <LabelValuePairBlock
              label={t(TranslationKey.Time)}
              value={<p className={styles.accentText}>{minsToTime(message.data.proposal.execution_time)}</p>}
              bgColor="green"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />

            <LabelValuePairBlock
              label={t(TranslationKey['Request price'])}
              labelClasses={styles.requestPriceText}
              value={
                <p className={cx(styles.accentText, styles.requestPriceText)}>
                  {toFixedWithDollarSign(message.data.proposal.price, 2)}
                </p>
              }
              bgColor="yellow"
              rootClasses={cx(styles.labelValueBlock, { [styles.labelValueBlockShowChatInfo]: isShowChatInfo })}
            />
          </div>

          <p className={styles.fieldLabel}>{t(TranslationKey['Photos and documents']) + ':'}</p>

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
