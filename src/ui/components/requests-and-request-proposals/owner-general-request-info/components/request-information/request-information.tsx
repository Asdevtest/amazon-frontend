import { FC, memo } from 'react'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { RequestPriority } from '@typings/enums/request/request-priority'
import { IProposal } from '@typings/models/proposals/proposal'
import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './request-information.style'

interface RequestInformationProps {
  priority: number
  maxAmountOfProposals: number
  requestProposals: IProposal[]
  title: string
  asin: string
  xid: string
  sub: ICreatedBy
  createdBy: ICreatedBy
}

export const RequestInformation: FC<RequestInformationProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { priority, maxAmountOfProposals, requestProposals, title, asin, xid, sub, createdBy } = props

  return (
    <div className={cx(styles.requestInformationWrapper, styles.firstBlock)}>
      <div className={styles.priorityWrapper}>
        <p className={styles.sectionTitle}>{t(TranslationKey['Request information'])}</p>

        {Number(priority) === RequestPriority.urgentPriority && (
          <div className={styles.prioritySubWrapper}>
            <p className={styles.sectionTitle}>{t(TranslationKey['Urgent request'])}</p>

            <img className={styles.priorityIcon} src="/assets/icons/fire.svg" />
          </div>
        )}
      </div>

      <div className={styles.requestInformationCardWrapper}>
        <div className={styles.requestInformation}>
          <div className={styles.requestInformationCardInfoTitles}>
            <p className={styles.sectionSubTitle}>{t(TranslationKey['Request information'])}</p>

            <p className={styles.sectionSubTitle}>
              {translateProposalsLeftMessage(
                maxAmountOfProposals -
                  (requestProposals?.filter(
                    el =>
                      el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_CLIENT ||
                      el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_CREATOR_OF_REQUEST ||
                      el?.proposal?.status === RequestProposalStatus?.ACCEPTED_BY_SUPERVISOR,
                  ).length || 0),
                maxAmountOfProposals,
              )}
            </p>
          </div>

          <p className={styles.sectionText}>{title}</p>
        </div>
        <div className={styles.requestMoreInformation}>
          <div className={styles.moreInformationSection}>
            <p className={styles.sectionSubTitle}>{t(TranslationKey['Request creator'])}</p>
            <UserLink
              blackText
              withAvatar
              name={sub?.name || createdBy?.name}
              userId={sub?._id || createdBy?._id}
              customStyles={{ fontSize: 14, fontWeight: 400 }}
              customAvatarStyles={{ width: 19, height: 19 }}
              maxNameWidth={130}
            />
          </div>
          <div className={styles.moreInformationSection}>
            <p className={styles.sectionSubTitle}>{t(TranslationKey.ASIN) + ':'}</p>
            <AsinOrSkuLink withCopyValue link={asin} />
          </div>
          <div className={styles.moreInformationSection}>
            <p className={styles.sectionSubTitle}>ID:</p>

            <Text className={styles.infoText} text={xid || t(TranslationKey.Missing)} />
          </div>
        </div>
      </div>
    </div>
  )
})
