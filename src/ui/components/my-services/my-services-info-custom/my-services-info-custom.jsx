/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React from 'react'

import { Avatar, Divider, Paper, Rating, Typography } from '@mui/material'

import {
  freelanceRequestType,
  freelanceRequestTypeByCode,
  freelanceRequestTypeByKey,
  freelanceRequestTypeTranslate,
} from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'

import { calcNumberMinusPercent, calcPercentAfterMinusNumbers } from '@utils/calculation'
import { formatDateDistanceFromNowStrict, formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './my-services-info-custom.style'

export const MyServicesInfoCustom = ({ request, announcementData, onClickSuggestDealBtn }) => {
  const { classes: classNames } = useClassNames()
  const now = new Date()

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainBlockWrapper}>
        <div className={classNames.buttonAndTitleWrapper}>
          <div className={classNames.titleAndCounterkWrapper}>
            <div className={classNames.titleBlockWrapper}>
              <Avatar src={getUserAvatarSrc(request?.request.createdBy._id)} className={classNames.userPhoto} />

              <div className={classNames.titleWrapper}>
                <Typography className={classNames.title}>{request?.request.createdBy.name}</Typography>

                <Rating
                  disabled
                  value={5}
                  classes={{ icon: classNames.icon }}
                  size="small"
                  // onChange={onChangeField('rating')}
                />
              </div>
            </div>

            <Typography className={classNames.successDeals}>
              {t(TranslationKey['The number of total successful transactions:']) + ' 0'}
            </Typography>
          </div>

          <Button variant="contained" color="primary" className={classNames.dealBtn} onClick={onClickSuggestDealBtn}>
            {t(TranslationKey['Suggest a deal'])}
          </Button>
        </div>

        <div className={classNames.requestTitleAndInfo}>
          <Typography className={classNames.requestTitle}>{request?.request.title}</Typography>
          <div className={classNames.requestInfoWrapper}>
            {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` &&
            request?.request?.priceAmazon ? (
              <div className={classNames.blockInfoWrapper}>
                <div className={classNames.blockInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>
                    {t(TranslationKey['Product price'])}
                  </Typography>
                  <div className={classNames.pricesWrapper}>
                    {newProductPrice && (
                      <Typography
                        className={cx(classNames.blockInfoCellText, { [classNames.newPrice]: newProductPrice })}
                      >
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </Typography>
                    )}

                    <Typography
                      className={cx(classNames.blockInfoCellText, {
                        [classNames.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                    </Typography>
                  </div>
                </div>

                <div className={classNames.blockInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</Typography>
                  <Typography className={cx(classNames.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </Typography>
                </div>
              </div>
            ) : null}
            <div className={classNames.blockInfoWrapper}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
                <Typography className={cx(classNames.price, classNames.blockInfoCellText)}>
                  {toFixed(request?.request.price, 2) + '$'}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Status)}</Typography>
                <div className={classNames.blockInfoCellText}>
                  {
                    <RequestStatusCell
                      status={request?.request.status}
                      styles={{ fontWeight: 600, fontSize: 14, lineHeight: '19px', textAlign: 'left' }}
                    />
                  }
                </div>
              </div>
            </div>

            <div className={cx(classNames.blockInfoWrapper)}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Time)}</Typography>
                <Typography className={classNames.blockInfoCellText}>
                  {request && formatDateDistanceFromNowStrict(request?.request.timeoutAt, now)}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Task type'])}</Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.request?.typeTask])}
                </Typography>
              </div>
            </div>

            <div className={cx(classNames.blockInfoWrapper, classNames.blockInfoWrapperLast)}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.Updated)}</Typography>
                <Typography className={classNames.blockInfoCellText}>
                  {formatNormDateTime(request?.request.updatedAt)}
                </Typography>
              </div>

              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>
                  {t(TranslationKey['Performance time'])}
                </Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {formatNormDateTime(request?.request.timeoutAt)}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider orientation="vertical" />

        <div className={cx(classNames.announcementBlock)}>
          <Typography className={classNames.requestTitle}>{t(TranslationKey.Announcement)}</Typography>
          <div className={cx(classNames.announcementTitleWrapper)}>
            <Typography className={cx(classNames.requestTitle, classNames.announcementTitle)}>
              {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[announcementData?.type])}
            </Typography>
            <Typography className={cx(classNames.announcementDecription)}>{announcementData?.description}</Typography>
          </div>
        </div>
      </div>
    </Paper>
  )
}
