import { Avatar } from 'antd'

import { Grid } from '@mui/material'
import Rating from '@mui/material/Rating'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './deal-details-card.style'

export const DealDetailsCard = ({
  onClickGetToWorkModal,
  onClickConfirmDealModal,
  onClickRejectDealModal,
  onSubmitSendInForRework,
  dealsOnReview,
  request,
  requestProposals,
  proposalId,
}) => {
  const { classes: styles, cx } = useStyles()
  const curProposal = requestProposals?.find(el => el?.proposal._id === proposalId)

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={cx(styles.leftBlockWrapper, { [styles.leftBlockMarginWrapper]: dealsOnReview })}>
          <div className={styles.usersInfoBlockWrapper}>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Client)}</p>
              <div className={styles.userInfo}>
                <Avatar src={getUserAvatarSrc(curProposal?.request?.createdBy?._id)} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink
                    blackText
                    name={curProposal?.request?.createdBy?.name}
                    userId={requestProposals?.request?.createdBy?._id}
                  />
                  {curProposal && <Rating readOnly value={curProposal?.request?.createdBy?.rating} />}
                </div>
              </div>
            </div>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Performer)}</p>
              <div className={styles.userInfo}>
                <Avatar src={getUserAvatarSrc(curProposal?.proposal.createdBy._id)} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink
                    blackText
                    name={curProposal?.proposal.createdBy.name}
                    userId={curProposal?.proposal.createdBy._id}
                  />
                  {curProposal && <Rating readOnly value={curProposal?.proposal?.createdBy?.rating} />}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.cardTitleBlockHeaderWrapper}>
              <p className={styles.cardTitle}>{`${t(TranslationKey['Client task'])}:`}</p>
              <p className={styles.cardTitle}>{request?.request?.title}</p>
              <p className={styles.cardDescription}>{request?.details?.conditions}</p>
              <p className={styles.cardTitle}>{`${t(TranslationKey['Proposed solution'])}:`}</p>
              <p className={styles.cardTitle}>{curProposal?.proposal.title}</p>
              <p className={styles.cardDescription}>{curProposal?.proposal.comment}</p>
            </div>
          </div>
          <div className={styles.sumAndTimeWrapper}>
            <div>
              <p className={styles.sumAndTimeTitle}>{t(TranslationKey.Budget)}</p>
              <p className={styles.cardPrice}>{toFixedWithDollarSign(curProposal?.proposal.price, 2)}</p>
            </div>
            <div>
              <p className={styles.sumAndTimeTitle}>{t(TranslationKey.Deadline)}</p>
              <p className={styles.text}>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</p>
            </div>
          </div>

          <SlideshowGallery slidesToShow={2} files={curProposal?.proposal.linksToMediaFiles} />

          {!dealsOnReview &&
          [
            RequestStatus.CORRECTED,
            RequestStatus.TO_CORRECT_BY_SUPERVISOR,
            RequestStatus.VERIFYING_BY_SUPERVISOR,
          ].includes(curProposal?.proposal.status) ? (
            <div>
              <Button onClick={() => onSubmitSendInForRework(curProposal?.proposal._id)}>
                {t(TranslationKey['Send in for rework'])}
              </Button>
            </div>
          ) : null}
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey['Time to complete'])}</p>

                <p className={styles.text}>{minsToTime(curProposal?.proposal.execution_time)}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey.Status)}</p>

                <Text
                  text={MyRequestStatusTranslate(curProposal?.proposal.status)}
                  color={colorByStatus(curProposal?.proposal.status)}
                />
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey.Deadline)}</p>

                <p className={styles.text}>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey['Total price'])}</p>

                <p className={styles.cardPrice}>{toFixedWithDollarSign(curProposal?.proposal.price, 2)}</p>
              </div>
            </div>
          </div>
          <div className={styles.resultWrapper}>
            <p className={styles.result}>{t(TranslationKey.Result)}</p>

            <p className={styles.resultDescription}>{curProposal?.details.result}</p>
          </div>
          <div className={styles.filesAndTimeWrapper}>
            <SlideshowGallery slidesToShow={2} files={curProposal?.details?.linksToMediaFiles} />

            <div className={styles.timeOnReviewWrapper}>
              <p className={styles.timeOnReviewTitle}>{t(TranslationKey['Time to complete'])}</p>
              <p className={styles.timeOnReview}>{'24ч 00мин'}</p>
            </div>
          </div>
          {!dealsOnReview &&
            [
              RequestStatus.CORRECTED,
              RequestStatus.TO_CORRECT_BY_SUPERVISOR,
              RequestStatus.VERIFYING_BY_SUPERVISOR,
            ].includes(curProposal?.proposal.status) && (
              <div className={styles.buttonsWrapper}>
                <Button
                  styleType={ButtonStyle.DANGER}
                  onClick={() => onClickRejectDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Reject the deal'])}
                </Button>

                <Button
                  styleType={ButtonStyle.SUCCESS}
                  onClick={() => onClickConfirmDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Accept the deal'])}
                </Button>
              </div>
            )}
          {dealsOnReview ? (
            <div className={styles.buttonWrapper}>
              <Button styleType={ButtonStyle.SUCCESS} onClick={() => onClickGetToWorkModal(curProposal?.proposal._id)}>
                {t(TranslationKey['Get to work'])}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Grid>
  )
}
