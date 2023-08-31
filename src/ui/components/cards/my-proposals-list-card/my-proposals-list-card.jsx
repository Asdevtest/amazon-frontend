import { cx } from '@emotion/css'

import { Grid } from '@mui/material'
import Rating from '@mui/material/Rating'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useClassNames } from './my-proposals-list-card.style'

import { ProposalsSlider } from '../../shared/proposals-slider'

export const MyProposalsListCard = ({
  item,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickOpenBtn,
  onClickResultBtn,
  isFirst,
}) => {
  const { classes: classNames } = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.cardTitleBlockWrapper}>
          <div className={classNames.userInfoWrapper}>
            <div className={classNames.nameWrapper}>
              <img
                src={getUserAvatarSrc(item?.createdBy?._id)}
                alt={`avatar-${item?.createdBy?.name}`}
                className={classNames.cardImg}
              />

              <div className={classNames.ratingWrapper}>
                <UserLink
                  blackText
                  name={item?.createdBy?.name}
                  userId={item?.createdBy?._id}
                  customClassNames={classNames.customUserLink}
                />
                <Rating disabled size="small" value={item?.createdBy?.rating} />
              </div>
            </div>

            <div className={classNames.cardSubTitleWrapper}>
              <p className={classNames.cardSubTitle}>{`${t(
                TranslationKey['The number of total successful transactions:'],
              )} 0`}</p>

              {item.withoutConfirmation && (
                <p className={classNames.withoutConfirmation}>
                  {t(TranslationKey['Available to work without confirmation'])}
                </p>
              )}
            </div>
          </div>

          <div className={classNames.moreInfoBlockWrapper}>
            <p className={classNames.cardTitle}>{item.title}</p>

            <div className={classNames.moreInfoWrapper}>
              <div className={classNames.blockInfoCell}>
                <p className={classNames.blockInfoCellTitle}>{t(TranslationKey['Task type']) + ':'}</p>
                <p className={cx(classNames.blockInfoCellText)}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[item?.typeTask]) ??
                    t(TranslationKey.Missing)}
                </p>
              </div>

              <div className={classNames.blockInfoCell}>
                <p className={classNames.blockInfoCellTitle}>{t(TranslationKey.ASIN) + ':'}</p>
                <AsinOrSkuLink withCopyValue asin={item.asin} />
              </div>

              <div className={classNames.blockInfoCell}>
                <p className={classNames.blockInfoCellTitle}>{t(TranslationKey.ID) + ':'}</p>
                <path className={cx(classNames.blockInfoCellText)}>
                  {item.humanFriendlyId ?? t(TranslationKey.Missing)}
                </path>
              </div>

              <div className={classNames.blockInfoCell}>
                <p className={classNames.blockInfoCellTitle}>{t(TranslationKey.Updated) + ':'}</p>
                <p className={classNames.blockInfoCellText}>{formatNormDateTime(item?.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className={classNames.divider}></div>
        </div>

        <ProposalsSlider
          item={item}
          title={t(TranslationKey.Proposal)}
          isFirst={isFirst}
          onClickEditBtn={onClickEditBtn}
          onClickDeleteBtn={onClickDeleteBtn}
          onClickOpenBtn={onClickOpenBtn}
          onClickResultBtn={onClickResultBtn}
        />
      </div>
    </Grid>
  )
}
