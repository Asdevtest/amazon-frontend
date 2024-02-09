import Linkify from 'react-linkify-always-blank'

import { Avatar, Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

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
              <Typography className={styles.userInfoName}>{t(TranslationKey.Client)}</Typography>
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
              <Typography className={styles.userInfoName}>{t(TranslationKey.Performer)}</Typography>
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
              <Typography className={styles.cardTitle}>{`${t(TranslationKey['Client task'])}:`}</Typography>
              <Typography className={styles.cardTitle}>{request?.request?.title}</Typography>
              <Typography className={styles.cardDescription}>{request?.details?.conditions}</Typography>
              <Typography className={styles.cardTitle}>{`${t(TranslationKey['Proposed solution'])}:`}</Typography>
              <Typography className={styles.cardTitle}>{curProposal?.proposal.title}</Typography>
              <Typography className={styles.cardDescription}>{curProposal?.proposal.comment}</Typography>
            </div>
          </div>
          <div className={styles.sumAndTimeWrapper}>
            <div>
              <Typography className={styles.sumAndTimeTitle}>{t(TranslationKey.Budget)}</Typography>
              <Typography className={styles.cardPrice}>
                {toFixedWithDollarSign(curProposal?.proposal.price, 2)}
              </Typography>
            </div>
            <div>
              <Typography className={styles.sumAndTimeTitle}>{t(TranslationKey.Deadline)}</Typography>
              <Typography className={styles.text}>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</Typography>
            </div>
          </div>
          <div className={styles.filesWrapper}>
            <PhotoAndFilesSlider smallSlider showPreviews files={curProposal?.proposal.linksToMediaFiles} />
          </div>
          {!dealsOnReview &&
          [
            RequestStatus.CORRECTED,
            RequestStatus.TO_CORRECT_BY_SUPERVISOR,
            RequestStatus.VERIFYING_BY_SUPERVISOR,
          ].includes(curProposal?.proposal.status) ? (
            <div>
              <Button
                className={styles.actionButton}
                onClick={() => onSubmitSendInForRework(curProposal?.proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            </div>
          ) : null}
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography className={styles.text}>{minsToTime(curProposal?.proposal.execution_time)}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey.Status)}</Typography>

                <RequestStatusCell status={curProposal?.proposal.status} />
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey.Deadline)}</Typography>

                <Typography className={styles.text}>{formatNormDateTime(curProposal?.proposal.timeoutAt)}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={styles.cardPrice}>
                  {toFixedWithDollarSign(curProposal?.proposal.price, 2)}
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.resultWrapper}>
            <Typography className={styles.result}>{t(TranslationKey.Result)}</Typography>
            <Linkify>
              <Typography className={styles.resultDescription}>{curProposal?.details.result}</Typography>
            </Linkify>
          </div>
          <div className={styles.filesAndTimeWrapper}>
            <div className={styles.filesWrapper}>
              <PhotoAndFilesSlider smallSlider showPreviews files={curProposal?.details?.linksToMediaFiles} />
            </div>

            <div className={styles.timeOnReviewWrapper}>
              <Typography className={styles.timeOnReviewTitle}>{t(TranslationKey['Time to complete'])}</Typography>
              <Typography className={styles.timeOnReview}>{'24ч 00мин'}</Typography>
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
                  danger
                  // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                  variant="contained"
                  color="primary"
                  className={styles.actionButton}
                  onClick={() => onClickRejectDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Reject the deal'])}
                </Button>

                <Button
                  success
                  // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                  variant="contained"
                  color="primary"
                  className={styles.actionButton}
                  onClick={() => onClickConfirmDealModal(curProposal?.proposal._id)}
                >
                  {t(TranslationKey['Accept the deal'])}
                </Button>
              </div>
            )}
          {dealsOnReview ? (
            <div className={styles.buttonWrapper}>
              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={styles.actionButton}
                onClick={() => onClickGetToWorkModal(curProposal?.proposal._id)}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Grid>
  )
}
