import { memo } from 'react'

import { Divider } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { RequestPriority } from '@typings/enums/request/request-priority'

import { useStyles } from './servant-general-request-info.style'

import { ProposalsSlider } from './proposals-slider'
import { RequestDetailsItem } from './request-details-item/request-details-item'

export const ServantGeneralRequestInfo = memo(({ request, onSubmit, requestProposals, onJoinChat }) => {
  const { classes: styles, cx } = useStyles()

  const buttonDisabled =
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
    ) ||
    (!!request?.request?.sub &&
      requestProposals?.some(el => el.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_CLIENT)) ||
    (requestProposals?.some(el =>
      [
        RequestProposalStatus.CREATED,
        RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED,
        RequestProposalStatus.TO_CORRECT,
        RequestProposalStatus.CORRECTED,
        RequestProposalStatus.READY_TO_VERIFY,
      ].includes(el.proposal?.status),
    ) &&
      request?.request?.restrictMoreThanOneProposalFromOneAssignee)

  const getMainInfos = () => (
    <div className={styles.mainInfosWrapper}>
      {requestProposals.length === 0 ? null : (
        <div className={styles.headerWrapper}>
          <p title={request?.request.title} className={styles.cardTitle}>
            {request?.request.title}
          </p>

          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={request?.request.product.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={request?.request.product.skuByClient} />

          <div className={styles.idTitleWrapper}>
            {request?.request?.priority === RequestPriority.urgentPriority && (
              <div className={styles.urgentWrapper}>
                <img src="/assets/icons/fire.svg" className={styles.urgentIconSmall} />
              </div>
            )}
            <p className={styles.idText}>{t(TranslationKey.ID) + ':'}</p>
            <p className={cx(styles.idText, styles.idTextDark)}>
              {request?.request?.humanFriendlyId || t(TranslationKey.Missing)}
            </p>
          </div>
        </div>
      )}

      <RequestTermsList withBorder request={request.request} />
    </div>
  )

  return (
    <div className={styles.root}>
      <div className={styles.mainBlockWrapper}>
        <div className={styles.mainWrapper}>
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

          <p className={styles.transactions}>{`${t(
            TranslationKey['The number of total successful transactions:'],
          )} 0`}</p>

          {!!requestProposals.length && <RequestDetailsItem request={request.request} />}

          {(request.request.status === RequestStatus.PUBLISHED ||
            request.request.status === RequestStatus.IN_PROCESS) && (
            <div className={styles.btnsBlockWrapper}>
              <Button
                disabled={buttonDisabled}
                tooltipInfoContent={t(TranslationKey['Make a proposal for the selected request'])}
                onClick={onSubmit}
              >
                {t(TranslationKey['Suggest a deal'])}
              </Button>
            </div>
          )}
        </div>

        {!requestProposals.length && (
          <div className={styles.requestInfoWrapper}>
            <div className={styles.titleAndIdWrapper}>
              <RequestDetailsItem showAllDetails request={request.request} />

              <ProductCell
                asin={request.request?.product?.asin}
                image={request.request?.product?.images?.[0]}
                sku={request.request?.product?.skuByClient}
                title={request.request?.product?.amazonTitle}
              />
            </div>

            <div>
              <p className={styles.standartText}>
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
                <p className={styles.confirmationToWorkText}>
                  {t(TranslationKey['It is possible to work without confirmation'])}
                </p>
              )}

              {request?.request?.priority === RequestPriority.urgentPriority && (
                <div className={styles.urgentWrapper}>
                  <img src="/assets/icons/fire.svg" className={styles.urgentIcon} />

                  <p className={styles.urgentText}>{t(TranslationKey['Urgent request'])}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {getMainInfos()}

        {!!requestProposals.length && (
          <>
            <Divider orientation={'vertical'} />
            <div className={styles.proposalsWrapper}>
              <ProposalsSlider
                isComment
                proposals={requestProposals}
                title={t(TranslationKey.Proposal)}
                onJoinChat={onJoinChat}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
})
