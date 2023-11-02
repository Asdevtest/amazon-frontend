import { Divider } from '@mui/material'

import { requestPriority } from '@constants/requests/request-priority'
import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { OrderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { ProposalsSlider } from '@components/shared/proposals-slider'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './servant-general-request-info.style'

export const ServantGeneralRequestInfo = ({ request, onSubmit, requestProposals }) => {
  const { classes: classNames, cx } = useClassNames()

  const buttonDisabled =
    (request?.request.restrictMoreThanOneProposalFromOneAssignee && requestProposals.length) ||
    requestProposals.some(
      el =>
        el.proposal?.status === RequestProposalStatus?.CREATED ||
        el.proposal?.status === RequestProposalStatus?.CORRECTED ||
        el.proposal?.status === RequestProposalStatus?.VERIFYING_BY_SUPERVISOR ||
        el.proposal?.status === RequestProposalStatus?.EXPIRED ||
        el.proposal?.status === RequestProposalStatus?.TO_CORRECT ||
        el.proposal?.status === RequestProposalStatus?.READY_TO_VERIFY ||
        el.proposal?.status === RequestProposalStatus?.PROPOSAL_EDITED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_CORRECTED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_ACCEPTED ||
        el.proposal?.status === RequestProposalStatus?.OFFER_CONDITIONS_REJECTED,
    )

  const getMainInfos = () => (
    <div className={classNames.mainInfosWrapper}>
      {requestProposals.length === 0 ? null : (
        <div className={classNames.headerWrapper}>
          <p className={classNames.cardTitle}>{request?.request.title}</p>

          <AsinOrSkuLink
            withCopyValue
            withAttributeTitle="asin"
            asin={request?.request.product.asin}
            textStyles={classNames.linkSpan}
            missingValueTextStyles={classNames.linkSpan}
          />

          <div className={classNames.idTitleWrapper}>
            {request?.request?.priority === requestPriority.urgentPriority && (
              <div className={classNames.urgentWrapper}>
                <img src="/assets/icons/fire.svg" className={classNames.urgentIconSmall} />
              </div>
            )}
            <p className={classNames.idText}>{t(TranslationKey.ID) + ':'}</p>
            <p className={cx(classNames.idText, classNames.idTextDark)}>
              {request?.request?.humanFriendlyId || t(TranslationKey.Missing)}
            </p>
          </div>
        </div>
      )}

      <RequestTermsList withBorder request={request.request} />
    </div>
  )

  return (
    <div className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.mainWrapper}>
          <UserLink
            blueText
            withAvatar
            ratingSize="large"
            name={request?.request?.createdBy?.name}
            userId={request?.request?.createdBy?._id}
            rating={request?.request?.createdBy?.rating}
            customAvatarStyles={{ width: 60, height: 60 }}
            customStyles={{ fontSize: 18, lineHeight: '30px' }}
            customRatingClass={{ fontSize: 24, opacity: 1 }}
          />

          <p className={classNames.transactions}>{`${t(
            TranslationKey['The number of total successful transactions:'],
          )} 0`}</p>

          {(request.request.status === RequestStatus.PUBLISHED ||
            request.request.status === RequestStatus.IN_PROCESS) && (
            <div className={classNames.btnsBlockWrapper}>
              <Button
                disabled={buttonDisabled}
                tooltipInfoContent={t(TranslationKey['Make a proposal for the selected request'])}
                variant="contained"
                color="primary"
                className={classNames.actionBtn}
                onClick={onSubmit}
              >
                {t(TranslationKey['Suggest a deal'])}
              </Button>
            </div>
          )}
        </div>

        {requestProposals.length === 0 ? (
          <div className={classNames.requestInfoWrapper}>
            <div className={classNames.titleAndIdWrapper}>
              <div className={classNames.idTitleWrapper}>
                <p className={classNames.idText}>{t(TranslationKey.Title) + ':'}</p>
                <p className={classNames.title}>{request?.request.title}</p>
              </div>

              <div className={classNames.idTitleWrapper}>
                <p className={classNames.idText}>{t(TranslationKey.ID) + ':'}</p>
                <p className={cx(classNames.idText, classNames.idTextDark)}>
                  {request?.request?.humanFriendlyId || t(TranslationKey.Missing)}
                </p>
              </div>

              <div>
                <OrderCell withoutSku imageSize={'small'} product={request.request.product} />
              </div>
            </div>

            <div>
              <p className={classNames.standartText}>
                {translateProposalsLeftMessage(
                  request?.request.maxAmountOfProposals -
                    (requestProposals?.filter(
                      el =>
                        el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CLIENT ||
                        el.proposal.status === RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                        el.proposal.status === RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
                    ).length || 0),
                  request?.request.maxAmountOfProposals,
                )}
              </p>

              {request?.request?.withoutConfirmation && (
                <p className={classNames.confirmationToWorkText}>
                  {t(TranslationKey['It is possible to work without confirmation'])}
                </p>
              )}

              {request?.request?.priority === requestPriority.urgentPriority && (
                <div className={classNames.urgentWrapper}>
                  <img src="/assets/icons/fire.svg" className={classNames.urgentIcon} />

                  <p className={classNames.urgentText}>{t(TranslationKey['Urgent request'])}</p>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {getMainInfos()}

        {requestProposals.length !== 0 ? (
          <div className={classNames.proposalsWrapper}>
            <Divider orientation={'vertical'} />

            <ProposalsSlider
              isComment
              proposals={requestProposals}
              title={t(TranslationKey.Proposal)}
              classNamesWrapper={classNames.sliderWrapper}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
